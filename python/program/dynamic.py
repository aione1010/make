#合唱团
#有 n 个学生站成一排，每个学生有一个能力值，牛牛想从这 n 个学生中按照顺序选取 k 名学生，要求相邻两个学生的位置编号的差不超过 d，使得这 k 个学生的能力值的乘积最大，你能返回最大的乘积吗？
#输入描述:
#每个输入包含 1 个测试用例。每个测试数据的第一行包含一个整数 n (1 <= n <= 50)，表示学生的个数，接下来的一行，包含 n 个整数，按顺序表示每个学生的能力值 ai（-50 <= ai <= 50）。接下来的一行包含两个整数，k 和 d (1 <= k <= 10, 1 <= d <= 50)。
#输出描述:
#输出一行表示最大的乘积。
#示例1
#输入
#3
#7 4 7
#2 50
#输出

#49


n=int(input())
arr = list(map(int,input().split()))
k,d=list(map(int,input().split()))

fm=[[0 for i in range(n)]for j in range(k)]
fn=[[0 for i in range(n)]for j in range(k)]
res=0
for i in range(n):
    fm[0][i]=arr[i]
    fn[0][i]=arr[i]
    
for i in range(n):
    for j in range(1,k):
        for m in range(i-1,max(i-d,0)-1,-1):   #确定第i个处的最值
            fm[j][i] = max(fm[j][i],fm[j-1][m]*arr[i],fn[j-1][m]*arr[i])
            fn[j][i] = min(fn[j][i],fm[j-1][m]*arr[i],fn[j-1][m]*arr[i])
    res= max(res,fm[k-1][i])

print(res)
