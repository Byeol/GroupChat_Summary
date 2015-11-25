
# coding: utf-8

class Message:
    def __init__(self, dt, name, text):
        self.dt = dt
        self.name = name
        self.text = text

class Thread:
    def __init__(self):
        self.messages = []
    def addMessage(self, message):
        self.messages.append(message)

import codecs
import re
from datetime import datetime
from datetime import timedelta

def importFile(fileName, messages):
    file = codecs.open(fileName, 'r', encoding='utf-8')
    lines = re.split("\r\n", file.read())
    file.close()

    messageParser = re.compile(r"\[(.*?)\] \[(.*?)\] (.*)", re.DOTALL)
    dateParser = re.compile("\ufeff*-+ (.*) -+", re.DOTALL)

    for line in lines:
        if messageParser.match(line) != None:
            line = messageParser.match(line)

            # process time
            t = line.group(2)
            t = t.replace("오전", "AM").replace("오후", "PM")
            t = datetime.strptime(t, "%p %I:%M")
            dt = datetime.combine(date, t.time())

            # generate Message object
            name = line.group(1)
            text = line.group(3)
            m = Message(dt, name, text)
            messages.append(m)
        elif dateParser.match(line) != None:
            line = dateParser.match(line)

            # process date
            date = line.group(1)
            date = datetime.strptime(date[:-4], "%Y년 %m월 %d일")

def makeThreads(messages, threads, td):
    # init
    threadCnt = 0
    thread = Thread()
    threadCnt += 1
    thread.title = "thread #" + str(threadCnt)
    thread.id = threadCnt
    threads.append(thread)
    prevMessage = messages[0]
    
    for message in messages:
        timeDelta = message.dt - prevMessage.dt
        prevMessage = message

        if timeDelta > td:
            thread = Thread()
            threadCnt += 1
            thread.title = "thread #" + str(threadCnt)
            thread.id = threadCnt
            threads.append(thread)

        thread.addMessage(message)
