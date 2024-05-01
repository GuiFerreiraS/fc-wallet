FROM golang:1.22

WORKDIR /app/

RUN apt-get update && apt-get install -y librdkafka-dev

COPY . .

RUN go mod tidy

RUN go build -o main ./cmd/walletcore

CMD ["./main"]
