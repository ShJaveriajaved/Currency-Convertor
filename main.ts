import inquirer from 'inquirer';

interface CurrencyConversionAnswers {
  amount: number;
  fromCurrency: string;
  toCurrency: string;
}

// Function to fetch exchange rates (replace with your implementation)
async function fetchExchangeRates(fromCurrency: string, toCurrency: string): Promise<number> {
  // Mocking exchange rates for demonstration purposes
  const exchangeRates: { [key: string]: number } = {
    'USD-USD': 1,
    'USD-Euro': 0.83,
    'USD-GBP': 0.72,
    'USD-JPY': 110.22,
    'Euro-USD': 1.20,
    'Euro-Euro': 1,
    'Euro-GBP': 0.87,
    'Euro-JPY': 130.95,
    // Add more exchange rates as needed
  };

  // Generating rate key
  const rateKey = `${fromCurrency}-${toCurrency}`;

  // Checking if rate exists
  if (exchangeRates.hasOwnProperty(rateKey)) {
    return exchangeRates[rateKey];
  } else {
    throw new Error('Exchange rate not found');
  }
}

// Function to perform currency conversion
async function convertCurrency(amount: number, fromCurrency: string, toCurrency: string): Promise<number> {
  // Fetching exchange rate
  const exchangeRate = await fetchExchangeRates(fromCurrency, toCurrency);
  
  // Calculating converted amount
  const convertedAmount = amount * exchangeRate;

  return convertedAmount;
}

async function currencyConversionPrompt(): Promise<void> {
  const answers = await inquirer.prompt<CurrencyConversionAnswers>([
    {
      type: 'number',
      name: 'amount',
      message: 'Enter amount to convert:'
    },
    {
      type: 'list',
      name: 'fromCurrency',
      message: 'Select currency to convert from:',
      choices: ['USD', 'Euro', 'GBP', 'JPY']
    },
    {
      type: 'list',
      name: 'toCurrency',
      message: 'Select currency to convert to:',
      choices: ['USD', 'Euro', 'GBP', 'JPY']
    }
  ]);

  try {
    // Performing currency conversion
    const convertedAmount = await convertCurrency(answers.amount, answers.fromCurrency, answers.toCurrency);
    
    console.log(`Converted Amount: ${convertedAmount.toFixed(2)} ${answers.toCurrency}`);
  } catch (error) {
    // Check if error has a message property
    if (error instanceof Error) {
      console.error('Error:', error.message);
    } else {
      console.error('An unknown error occurred');
    }
  }
}

// Example usage:
currencyConversionPrompt();