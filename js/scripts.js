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
//delete



function BankAccount (name, amount) {
  this.name = name;
  this.amount = amount;
}

BankAccount.prototype.deposit = function(money) {
  this.amount += money
};

BankAccount.prototype.withdraw = function(money) {
  this.amount -= money
};




//ui logic
$(document).ready(function () {

const bank = new Bank;

  $("form#register-form").submit(function (event) {
    event.preventDefault();
    const nameInput = $("#name").val();
    const initialInput = $("#initial-deposit").val();
    const newAccount = new BankAccount(nameInput, initialInput);
    bank.register(newAccount);
  });
  
  $("form#account-form").submit(function (event) {
    event.preventDefault();
    const depositInput = $("#deposit").val();
    const withdrawInput = $("#withdraw").val();
    //option html 
    //find
    $("#display-text").text(text);
  });
});

