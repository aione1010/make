#ifndef PRODUCER_H_
#define PRODUCER_H_

#include <stdio.h>
#include <signal.h>
#include <string.h>
#include <iostream>
#include <fstream>
#include "librdkafka/rdkafka.h"
#include <sys/time.h>
#include <iomanip>
#include <cstdlib>
#include <libconfig.h++>
#include <vector>

#endif

using namespace std;
using namespace libconfig;

// txt -> producer

static int run = 1;

static void stop(int sig)
{
    run = 0;
    fclose(stdin);
}

static long long usec(void)
{
    struct timeval tv_begin;
    struct timezone tz_begin;
    gettimeofday(&tv_begin, &tz_begin);
    return tv_begin.tv_sec * 1000 + tv_begin.tv_usec / 1000;
}

/*
    每条消息调用一次该回调函数，说明消息是传递成功(rkmessage->err == RD_KAFKA_RESP_ERR_NO_ERROR)
    还是传递失败(rkmessage->err != RD_KAFKA_RESP_ERR_NO_ERROR)
    该回调函数由rd_kafka_poll()触发，在应用程序的线程上执行
 */
static void dr_msg_cb(rd_kafka_t *rk,
                      const rd_kafka_message_t *rkmessage, void *opaque)
{
    if (rkmessage->err)
        fprintf(stderr, "%% Message delivery failed: %s\n",
                rd_kafka_err2str(rkmessage->err));
    //    else
    //        fprintf(stdout,
    //                "%% Message delivered (%zd bytes, "
    //                "partition %" PRId32")\n",
    //                rkmessage->len, rkmessage->partition);
    /* rkmessage被librdkafka自动销毁*/
}

int main(int argc, char **argv)
{

    try
    {
        // 加载配置文件
        Config cfg;
        cfg.readFile("../conf/network.conf");

        // kafka
        rd_kafka_t *rk;        /*Producer instance handle*/
        rd_kafka_topic_t *rkt; /*topic对象*/
        rd_kafka_conf_t *conf; /*临时配置对象*/
        char errstr[512];
        char charBrokers[800];
        const char *topic;
        //生产消息数
        int count = 0;
        const char *kafka_ip = cfg.lookup("kafka_ip").c_str();
        int kafka_port = cfg.lookup("kafka_port");
        sprintf(charBrokers, "%s%s%d", kafka_ip, ":", kafka_port);
        // cout << charBrokers << endl;
        string strBrokers = charBrokers;
        const char *brokers = strBrokers.c_str();

        const char *kafka_topic = cfg.lookup("kafka_topic_pg_XD_DAMS_AA").c_str();
        topic = kafka_topic;

        /* 创建一个kafka配置占位 */
        conf = rd_kafka_conf_new();

        /*创建broker集群*/
        if (rd_kafka_conf_set(conf, "bootstrap.servers", brokers, errstr,
                              sizeof(errstr)) != RD_KAFKA_CONF_OK)
        {
            fprintf(stderr, "%s\n", errstr);
            return 1;
        }

        /*设置发送报告回调函数，rd_kafka_produce()接收的每条消息都会调用一次该回调函数
     *应用程序需要定期调用rd_kafka_poll()来服务排队的发送报告回调函数*/
        rd_kafka_conf_set_dr_msg_cb(conf, dr_msg_cb);

        /*创建producer实例
      rd_kafka_new()获取conf对象的所有权,应用程序在此调用之后不得再次引用它*/
        rk = rd_kafka_new(RD_KAFKA_PRODUCER, conf, errstr, sizeof(errstr));
        if (!rk)
        {
            fprintf(stderr, "%% Failed to create new producer:%s\n", errstr);
            return 1;
        }

        /*实例化一个或多个topics(`rd_kafka_topic_t`)来提供生产或消费，topic
    对象保存topic特定的配置，并在内部填充所有可用分区和leader brokers，*/
        rkt = rd_kafka_topic_new(rk, topic, NULL);
        if (!rkt)
        {
            fprintf(stderr, "%% Failed to create topic object: %s\n",
                    rd_kafka_err2str(rd_kafka_last_error()));
            rd_kafka_destroy(rk);
            return 1;
        }

        /*用于中断的信号*/
        signal(SIGINT, stop);

        fprintf(stderr,
                "%% Type some text and hit enter to produce message\n"
                "%% Or just hit enter to only serve delivery reports\n"
                "%% Press Ctrl-C or Ctrl-D to exit\n");
        long long begin = usec();

        // read file
        const char *kafka_filename = cfg.lookup("kafka_rr");
        fstream file(kafka_filename);
        vector<string> fileCount;
        string fileLine;
        while (getline(file, fileLine))
        {
            fileCount.push_back(fileLine);
        }

        cout << "行数:" << fileCount.size() << endl;
        for (int j = 0; j < fileCount.size(); j++)
            {

                const char *json = fileCount.at(j).c_str();
                //                cout << "json :" << json << endl;
                //            cout << "json size :" << jsonCount.at(j).length() << endl;

                char buf[5000];
                sprintf(buf, "%s", json);
                size_t len = strlen(buf);
                //            cout << "buf :" << buf << endl;

                if (buf[len - 1] == '\n')
                    buf[--len] = '\0';

                if (len == 0)
                {
                    /*轮询用于事件的kafka handle, 事件将导致应用程序提供的回调函数被调用,
    第二个参数是最大阻塞时间, 如果设为0, 将会是非阻塞的调用*/
                    rd_kafka_poll(rk, 0);
                    continue;
                }

                //        retry:
                /*Send/Produce message.
这是一个异步调用，在成功的情况下，只会将消息排入内部producer队列，
对broker的实际传递尝试由后台线程处理，之前注册的传递回调函数(dr_msg_cb)
用于在消息传递成功或失败时向应用程序发回信号*/
                if (rd_kafka_produce(
                        /* Topic object */
                        rkt,
                        /*使用内置的分区来选择分区*/
                        RD_KAFKA_PARTITION_UA,
                        /*生成payload的副本*/
                        RD_KAFKA_MSG_F_COPY,
                        /*消息体和长度*/
                        buf, len,
                        /*可选键及其长度*/
                        NULL, 0,
                        NULL) == -1)
                {
                    //            fprintf(stderr,
                    //                    "%% Failed to produce to topic %s: %s\n",
                    //                    rd_kafka_topic_name(rkt),
                    //                    rd_kafka_err2str(rd_kafka_last_error()));

                    //            if (rd_kafka_last_error() == RD_KAFKA_RESP_ERR__QUEUE_FULL) {
                    //                /*如果内部队列满，等待消息传输完成并retry,
                    //                内部队列表示要发送的消息和已发送或失败的消息，
                    //                内部队列受限于queue.buffering.max.messages配置项*/
                    //                rd_kafka_poll(rk, 5000);
                    //                goto retry;
                    //            }
                }
                else
                {
                    count++;
                    //打印生产的消息
                    //                     fprintf(stdout, "%% Enqueued message (%s %zd bytes) for topic %s\n", buf, len, rd_kafka_topic_name(rkt));
                }

                /*producer应用程序应不断地通过以频繁的间隔调用rd_kafka_poll()来为
传送报告队列提供服务。在没有生成消息以确定先前生成的消息已发送了其
发送报告回调函数(和其他注册过的回调函数)期间，要确保rd_kafka_poll()
仍然被调用*/
                rd_kafka_poll(rk, 0);
            }
            // release vector memory
            vector<string>().swap(fileCount);
        file.clear();
        file.close();

        

        long long end = usec();
        if ((end - begin) > 0)
        {
            cout << "send message count :" << count << endl;
            cout << " Throughput (producer):" << count / (end - begin) * 1000 << endl;
        }

        fprintf(stdout, "%% Flushing final message.. \n");
        /*rd_kafka_flush是rd_kafka_poll()的抽象化，
    等待所有未完成的produce请求完成，通常在销毁producer实例前完成
    以确保所有排列中和正在传输的produce请求在销毁前完成*/
        rd_kafka_flush(rk, 10 * 1000);

        /* Destroy topic object */
        rd_kafka_topic_destroy(rkt);

        /* Destroy the producer instance */
        rd_kafka_destroy(rk);
    }
    catch (const FileIOException &fioex)
    {
        std::cerr << "I/O error while reading file." << std::endl;
        return (EXIT_FAILURE);
    }
    catch (const ParseException &pex)
    {
        std::cerr << "Parse error at " << pex.getFile() << ":" << pex.getLine()
                  << " - " << pex.getError() << std::endl;
        return (EXIT_FAILURE);
    }
    catch (const SettingNotFoundException &nfex)
    {
        cerr << "No 'name' setting in configuration file." << endl;
    }

    return 0;
}