import './styles.css';

// -----------------------------------------1--------------------------------------------------

{
  const delay = ms => {
    const promise = new Promise(res => {
      setTimeout(() => {
        res(ms);
      }, ms);
    });
    return promise;
  };

  const logger = time => console.log(`Resolved after ${time}ms`);

  delay(2000).then(logger); // Resolved after 2000ms
  delay(1000).then(logger); // Resolved after 1000ms
  delay(1500).then(logger); // Resolved after 1500ms
}

// -----------------------------------------2--------------------------------------------------

{
  const users = [
    { name: 'Mango', active: true },
    { name: 'Poly', active: false },
    { name: 'Ajax', active: true },
    { name: 'Lux', active: false },
  ];

  const toggleUserState = (allUsers, userName) => {
    const promise = new Promise(res => {
      const updatedUsers = allUsers.map(user =>
        user.name === userName ? { ...user, active: !user.active } : user,
      );
      res(updatedUsers);
    });
    return promise;
  };

  const logger = updatedUsers => console.table(updatedUsers);

  toggleUserState(users, 'Mango').then(logger);
  toggleUserState(users, 'Lux').then(logger);
}

// -----------------------------------------3--------------------------------------------------

const randomIntegerFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const makeTransaction = transaction => {
  const delay = randomIntegerFromInterval(200, 500);
  const promise = new Promise((res, rej) => {
    setTimeout(() => {
      const canProcess = Math.random() > 0.3;
      if (canProcess) {
        res([transaction.id, delay]);
      } else {
        rej(transaction.id);
      }
    }, delay);
  });
  return promise;
};

const logSuccess = ([id, time]) => {
  console.log(`Transaction ${id} processed in ${time}ms`);
};

const logError = id => {
  console.warn(`Error processing transaction ${id}. Please try again later.`);
};

makeTransaction({ id: 70, amount: 150 }).then(logSuccess).catch(logError);
makeTransaction({ id: 71, amount: 230 }).then(logSuccess).catch(logError);
makeTransaction({ id: 72, amount: 75 }).then(logSuccess).catch(logError);
makeTransaction({ id: 73, amount: 100 }).then(logSuccess).catch(logError);
