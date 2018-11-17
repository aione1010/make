import turtle
t=turtle.Turtle()
w=turtle.Screen()

def drawSpiral(t,linelen):
    if linelen >0:
        t.forward(linelen)
        t.right(90)
        drawSpiral(t,linelen-5)
drawSpiral(t,300)
w.exitonclick()
