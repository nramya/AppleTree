FROM python:2.7-slim

EXPOSE 5000

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
CMD python app.py