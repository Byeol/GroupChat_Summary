
# coding: utf-8

from flask.json import JSONEncoder

class JsonEncoder(JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Thread):
            return obj.__dict__
        if isinstance(obj, Message):
            return obj.__dict__
        if isinstance(obj, datetime):
            return {
                'year': obj.year,
                'month': obj.month,
                'day': obj.day,
                'hour': obj.hour,
                'minute': obj.minute
            }
        return super(myJsonEncoder, self).default(obj)
