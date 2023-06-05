FROM python:3.9

# Install Java
RUN apt-get update && apt-get install -y openjdk-11-jdk

# Set Java environment variables (optional)
ENV JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
ENV PATH=$PATH:$JAVA_HOME/bin

# Set working directory
WORKDIR /srv

# Copy files
COPY . /srv

# Upgrade pip and install requirements
RUN pip install --upgrade pip
RUN pip install -U setuptools
RUN pip install wheel
RUN pip install -r requirements.txt

# Set Flask environment variable
ENV FLASK_APP=app

# Run the Flask app
CMD ["python", "app.py"]