
# coding: utf-8

from KakaoTalkParser import *
from JsonEncoder import *

from flask import Flask, render_template, jsonify

app = Flask(__name__)

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/api/threads")
def api():
    return jsonify(results=threads)

def main():
    file = "KakaoTalk_group.txt"
    td = timedelta(hours=1)
    
    messages = []
    importFile(file, messages)
    
    threads = []
    makeThreads(messages, threads, td)

    app.json_encoder = JsonEncoder
    app.run()
    
if __name__ == "__main__":
    main()
