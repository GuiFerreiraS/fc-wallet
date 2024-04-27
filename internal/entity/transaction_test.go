package entity

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestCreateTransaction(t *testing.T) {
	client1, _ := NewClient("Client 1", "j@j")
	account1 := NewAccount(client1)
	client2, _ := NewClient("Client 2", "j@j2")
	account2 := NewAccount(client2)

	account1.Credit(1000)
	account2.Credit(1000)

	transaction, _ := NewTransaction(account2, account1, 100)
	transaction.Commit()
	assert.NotNil(t, transaction)
	assert.Equal(t, 1100.0, account1.Balance)
	assert.Equal(t, 900.0, account2.Balance)
}

func TestCreateTransactionWithInsufficientBalance(t *testing.T) {
	client1, _ := NewClient("John Doe", "j@j")
	account1 := NewAccount(client1)
	client2, _ := NewClient("Jane Doe", "j@j2")
	account2 := NewAccount(client2)

	account1.Credit(1000)
	account2.Credit(1000)

	transaction, err := NewTransaction(account1, account2, 2000)
	assert.Nil(t, transaction)
	assert.NotNil(t, err)
	assert.Error(t, err, "insufficient funds")
	assert.Equal(t, 1000.0, account1.Balance)
	assert.Equal(t, 1000.0, account2.Balance)
}
