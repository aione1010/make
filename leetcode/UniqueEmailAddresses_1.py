def numUniqueEmails(emails):
    pool=set()        #利用集合的并集

    for email in emails:
        devide_address = email.split("@")
        em1 = ""
        for i in em1:
            if i == "." :
                continue
            elif i == "+" :
                break
            else:
                em1 += i
        pool.add(em1 + "@" + devide_address[1])   #集合并集
    return len(pool)

    
