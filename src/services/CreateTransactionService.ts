import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  type: string;
  value: number;
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: Request): Transaction {
    const typeParsed = type === 'income' ? 'income' : 'outcome';

    if (typeParsed === 'outcome') {
      const balance = this.transactionsRepository.getBalance();

      if (balance.total - value < 0) {
        throw Error('Insufficient balance');
      }
    }

    const transaction = this.transactionsRepository.create({
      title,
      type: typeParsed,
      value,
    });

    return transaction;
  }
}

export default CreateTransactionService;
