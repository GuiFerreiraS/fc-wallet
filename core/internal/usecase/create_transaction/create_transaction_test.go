package create_transaction

import (
	"context"
	"testing"

	"github.com.br/devfullcycle/fc-ms-wallet/internal/entity"
	"github.com.br/devfullcycle/fc-ms-wallet/internal/event"
	"github.com.br/devfullcycle/fc-ms-wallet/internal/usecase/mocks"
	"github.com.br/devfullcycle/fc-ms-wallet/pkg/events"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

func TestCreateTransactionUseCase_Execute(t *testing.T) {
	client1, _ := entity.NewClient("Client 1", "j@j.com")
	account1 := entity.NewAccount(client1)
	account1.Credit(1000)

	client2, _ := entity.NewClient("Client 2", "j@j2.com")
	account2 := entity.NewAccount(client2)
	account2.Credit(1000)

	mockUou := &mocks.UowMock{}
	mockUou.On("Do", mock.Anything, mock.Anything).Return(nil)

	input := CreateTransactionInputDTO{
		AccountIDFrom: account1.ID,
		AccountIDTo:   account2.ID,
		Amount:        100,
	}

	dispatcher := events.NewEventDispatcher()
	transactionCreatedEvent := event.NewTransactionCreated()
	balanceUpdatedEvent := event.NewBalanceUpdated()
	ctx := context.Background()

	uc := NewCreateTransactionUseCase(
		mockUou,
		dispatcher,
		transactionCreatedEvent,
		balanceUpdatedEvent,
	)
	output, err := uc.Execute(ctx, input)
	assert.Nil(t, err)
	assert.NotNil(t, output)
	mockUou.AssertExpectations(t)
	mockUou.AssertNumberOfCalls(t, "Do", 1)
}
