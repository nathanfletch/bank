function Bank () {
  this.accounts = {};
  this.currentId = 0;
}


Bank.prototype.assignId = function () {
  this.currentId++;
  return this.currentId;
};

Bank.prototype.register = function (account) {
  account.id = this.assignId();
  this.accounts[account.id] = account;
};

//find
Bank.prototype.findAccount = function(id) {
  if (this.accounts[id] != undefined) {
    return this.accounts[id];
  }
  return false;
};

Bank.prototype.deleteAccount = function(id) {
  if (this.accounts[id] === undefined) {
    return false;
  }
  delete this.accounts[id];
  return true;
};

function BankAccount (name, amount) {
  this.name = name;
  this.amount = amount;
}

BankAccount.prototype.deposit = function(money) {
  
  this.amount = parseInt(this.amount) + parseInt(money);
};

BankAccount.prototype.withdraw = function(money) {
  
  this.amount = parseInt(this.amount) - parseInt(money);
};


//ui logic
const bank = new Bank;
//ui functions
function populateOptions() {
  let htmlOptions = "";
  console.log(bank.accounts);
  Object.keys(bank.accounts).forEach(accountId => {
    htmlOptions += "<option data-id=" + accountId + ">" + bank.accounts[accountId].name + "</option>"
  });
  console.log(htmlOptions);
  $("#select-account").html(htmlOptions);
  $("#delete-options").html(htmlOptions);
}


$(document).ready(function () {



  

  $("form#register-form").submit(function (event) {
    event.preventDefault();
    const nameInput = $("#name").val();
    const initialInput = $("#initial-deposit").val();
    
    const newAccount = new BankAccount(nameInput, initialInput);
    bank.register(newAccount);
    populateOptions();
    $("#balance-display").text(newAccount.amount);
    // $("#select-account").attr("selected", newAccount.id)
    // $("#select-account").attr("selected", newAccount.id)
    $("#name").val("");
    $("#initial-deposit").val("");

  });
  
  $("form#account-form").submit(function (event) {
    event.preventDefault();
    const accountIdInput = $("#select-account").find(':selected').data('id');
    const depositInput = parseInt($("#deposit").val()) || 0;
    const withdrawInput = parseInt($("#withdraw").val()) || 0;
    const account = bank.findAccount(accountIdInput);
    
    account.deposit(depositInput);
    account.withdraw(withdrawInput);
    $("#balance-display").text(account.amount);

    $("#deposit").val("");
    $("#withdraw").val("");
  });

  $("#delete-options").change(function(event) {
    event.preventDefault();
    const accountIdInput = $("#delete-options").find(':selected').data('id');
    const account = bank.findAccount(accountIdInput);
    $("#balance-display").text(account.amount);
  });

  $("form#delete-form").submit(function(event) {
    event.preventDefault();
    const accountIdInput = $("#delete-options").find(':selected').data('id');
    console.log(accountIdInput);
    
    console.log(bank);
    bank.deleteAccount(accountIdInput);
    populateOptions();
    console.log(bank);
  })
});

