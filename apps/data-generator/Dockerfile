FROM python
WORKDIR /app
COPY . .
RUN python -m pip install -r requirements.txt
RUN python -m pip install -e libs/

ENTRYPOINT [ "python", "run_data_gen.py" ]