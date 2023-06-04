# Dockerfile
FROM python:3.9.10-alpine3.14
WORKDIR /srv
COPY . /srv
RUN pip install --upgrade pip
RUN pip --no-cache-dir install -r requirements.txt
ENV FLASK_APP=app
CMD ["python","app.py"]