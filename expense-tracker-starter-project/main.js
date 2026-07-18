let transactions = [];
let editingTransactionId = null;
const STORAGE_KEY = 'transactions';

function generateUniqueId() {
  return +new Date() + Math.floor(Math.random() * 1000);
}

function renderTransactions() {
  const incomeList = document.getElementById('incomeList');
  const expenseList = document.getElementById('expenseList');

  if (!incomeList || !expenseList) return;

  incomeList.innerHTML = '';
  expenseList.innerHTML = '';

  const searchInput = document.getElementById('searchTransactionFormTitleInput');
  const keyword = searchInput ? searchInput.value.trim().toLowerCase() : '';

  const filteredTransactions = transactions.filter(transaction => {
    if (!keyword) return true;
    return transaction.title.toLowerCase().includes(keyword);
  });

  filteredTransactions.forEach(transaction => {
    const card = createTransactionCard(transaction);
    if (transaction.type === 'income') {
      incomeList.appendChild(card);
    } else if (transaction.type === 'expense') {
      expenseList.appendChild(card);
    }
  });
}

function createTransactionCard(transaction) {
  const card = document.createElement('div');
  card.setAttribute('data-testid', 'transactionItem');
  card.className = 'tracker-transaction-item';

  const iconDiv = document.createElement('div');
  iconDiv.className = `tracker-transaction-item__icon tracker-transaction-item__icon--${transaction.type}`;
  iconDiv.textContent = transaction.type === 'income' ? '💰' : '💸';
  card.appendChild(iconDiv);

  const detailDiv = document.createElement('div');
  detailDiv.className = 'tracker-transaction-item__detail';

  const titleEl = document.createElement('h3');
  titleEl.setAttribute('data-testid', 'transactionItemTitle');
  titleEl.className = 'tracker-transaction-item__title';
  titleEl.textContent = transaction.title;
  detailDiv.appendChild(titleEl);

  const dateEl = document.createElement('p');
  dateEl.setAttribute('data-testid', 'transactionItemDate');
  dateEl.className = 'tracker-transaction-item__date';
  dateEl.textContent = `Tanggal: ${transaction.date}`;
  detailDiv.appendChild(dateEl);

  const typeEl = document.createElement('p');
  typeEl.setAttribute('data-testid', 'transactionItemType');
  typeEl.className = 'tracker-transaction-item__date';
  typeEl.textContent = `Tipe: ${transaction.type === 'income' ? 'Pemasukan' : 'Pengeluaran'}`;
  detailDiv.appendChild(typeEl);

  card.appendChild(detailDiv);

  const rightDiv = document.createElement('div');
  rightDiv.className = 'tracker-transaction-item__right';

  const amountEl = document.createElement('p');
  amountEl.setAttribute('data-testid', 'transactionItemAmount');
  amountEl.className = `tracker-transaction-item__amount tracker-transaction-item__amount--${transaction.type}`;
  amountEl.textContent = `Nominal: Rp${transaction.amount}`;
  rightDiv.appendChild(amountEl);

  const actionsDiv = document.createElement('div');
  actionsDiv.className = 'tracker-transaction-item__actions';

  const editTypeBtn = document.createElement('button');
  editTypeBtn.setAttribute('data-testid', 'transactionItemEditTypeButton');
  editTypeBtn.className = 'tracker-transaction-item__btn';
  editTypeBtn.textContent = 'Ubah Tipe';
  editTypeBtn.addEventListener('click', () => {
    transaction.type = transaction.type === 'income' ? 'expense' : 'income';
    saveTransactionsToStorage();
    document.dispatchEvent(new Event('transaction:updated'));
  });
  actionsDiv.appendChild(editTypeBtn);

  const editBtn = document.createElement('button');
  editBtn.setAttribute('data-testid', 'transactionItemEditButton');
  editBtn.className = 'tracker-transaction-item__btn';
  editBtn.textContent = 'Edit';
  editBtn.addEventListener('click', () => {
    editingTransactionId = transaction.id;

    const titleInput = document.getElementById('transactionFormTitleInput');
    const amountInput = document.getElementById('transactionFormAmountInput');
    const dateInput = document.getElementById('transactionFormDateInput');
    const typeSelect = document.getElementById('transactionFormTypeSelect');
    const submitBtn = document.querySelector('[data-testid="transactionFormSubmitButton"]');

    if (titleInput) titleInput.value = transaction.title;
    if (amountInput) amountInput.value = transaction.amount;
    if (dateInput) dateInput.value = transaction.date;
    if (typeSelect) typeSelect.value = transaction.type;
    if (submitBtn) submitBtn.textContent = 'Simpan Perubahan';

    if (titleInput) titleInput.focus();
  });
  actionsDiv.appendChild(editBtn);

  const deleteBtn = document.createElement('button');
  deleteBtn.setAttribute('data-testid', 'transactionItemDeleteButton');
  deleteBtn.className = 'tracker-transaction-item__btn';
  deleteBtn.textContent = 'Hapus';
  deleteBtn.addEventListener('click', () => {
    transactions = transactions.filter(t => t.id !== transaction.id);
    if (editingTransactionId === transaction.id) {
      editingTransactionId = null;
      const form = document.getElementById('transactionForm');
      if (form) form.reset();
      const submitBtn = document.querySelector('[data-testid="transactionFormSubmitButton"]');
      if (submitBtn) submitBtn.textContent = 'Simpan';
    }
    saveTransactionsToStorage();
    document.dispatchEvent(new Event('transaction:updated'));
  });
  actionsDiv.appendChild(deleteBtn);

  rightDiv.appendChild(actionsDiv);
  card.appendChild(rightDiv);

  return card;
}

function handleTransactionFormSubmit(e) {
  e.preventDefault();

  const titleInput = document.getElementById('transactionFormTitleInput');
  const amountInput = document.getElementById('transactionFormAmountInput');
  const dateInput = document.getElementById('transactionFormDateInput');
  const typeSelect = document.getElementById('transactionFormTypeSelect');

  if (!titleInput || !amountInput || !dateInput || !typeSelect) return;

  const title = titleInput.value.trim();
  const amount = Number(amountInput.value);
  const date = dateInput.value || new Date().toISOString().split('T')[0];
  const type = typeSelect.value;

  if (!title || isNaN(amount) || amount < 1) {
    alert('Mohon masukkan judul transaksi yang valid dan nominal uang minimal 1 rupiah.');
    return;
  }

  if (editingTransactionId !== null) {
    const targetIndex = transactions.findIndex(t => t.id === editingTransactionId);
    if (targetIndex !== -1) {
      transactions[targetIndex] = {
        ...transactions[targetIndex],
        title,
        amount,
        date,
        type
      };
    }
    editingTransactionId = null;
    const submitBtn = document.querySelector('[data-testid="transactionFormSubmitButton"]');
    if (submitBtn) submitBtn.textContent = 'Simpan';
  } else {
    const newTransaction = {
      id: generateUniqueId(),
      title,
      amount,
      date,
      type
    };
    transactions.push(newTransaction);
  }

  e.target.reset();
  dateInput.value = new Date().toISOString().split('T')[0];

  saveTransactionsToStorage();
  document.dispatchEvent(new Event('transaction:updated'));
}

function updateDashboard() {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const currentBalance = totalIncome - totalExpense;

  const balanceEl = document.querySelector('.tracker-summary__balance-amount');
  const incomeEl = document.querySelector('.tracker-summary__stat-amount--income');
  const expenseEl = document.querySelector('.tracker-summary__stat-amount--expense');

  if (balanceEl) balanceEl.textContent = `Rp ${currentBalance}`;
  if (incomeEl) incomeEl.textContent = `Rp ${totalIncome}`;
  if (expenseEl) expenseEl.textContent = `Rp ${totalExpense}`;
}

function saveTransactionsToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

function loadTransactionsFromStorage() {
  const storedData = localStorage.getItem(STORAGE_KEY);
  if (storedData) {
    try {
      transactions = JSON.parse(storedData);
    } catch (error) {
      console.error('Gagal membaca data dari localStorage:', error);
      transactions = [];
    }
  }
}

document.addEventListener('transaction:updated', () => {
  renderTransactions();
  updateDashboard();
});

function initSearchAndEvents() {
  const transactionForm = document.getElementById('transactionForm');
  if (transactionForm) {
    transactionForm.addEventListener('submit', handleTransactionFormSubmit);
  }

  const searchForm = document.getElementById('searchTransactionForm');
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      renderTransactions();
    });
  }

  const searchInput = document.getElementById('searchTransactionFormTitleInput');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      renderTransactions();
    });
  }
}

function initApp() {
  loadTransactionsFromStorage();

  const dateInput = document.getElementById('transactionFormDateInput');
  if (dateInput && !dateInput.value) {
    dateInput.value = new Date().toISOString().split('T')[0];
  }

  initSearchAndEvents();
  document.dispatchEvent(new Event('transaction:updated'));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}