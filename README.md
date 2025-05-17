# Australian Citizenship Eligibility Checker

A modern web application that helps permanent residents calculate their eligibility date for Australian citizenship. This tool provides a user-friendly interface to track residency requirements and absence periods.

## Features

- 📅 Calculate your citizenship eligibility date based on:
  - Lawful residence start date
  - Permanent visa start date
  - Travel history outside Australia
- ✈️ Track multiple trips with:
  - Interactive date picker
  - CSV import option for bulk trip entries
- 📊 Clear visualization of:
  - Application eligibility date
  - Remaining absence days for 4-year period
  - Remaining absence days for 12-month period
- 🎨 Modern, responsive UI built with:
  - Next.js
  - Tailwind CSS
  - shadcn/ui components

## Requirements

To be eligible for Australian citizenship, you must have:

1. Been living in Australia on a valid visa for 4 years immediately before applying
2. Held a permanent visa for the last 12 months immediately before applying
3. Not been absent from Australia for more than:
   - 12 months in the past 4 years
   - 90 days in the 12 months immediately before applying

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/citizenship-checker.git
   cd citizenship-checker
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Enter your Lawful Residence Start Date (when you first started living in Australia on a valid visa)
2. Enter your Permanent Visa Start Date
3. Add your trips outside Australia using either:
   - The date picker interface
   - CSV import (format: DD/MM/YYYY, DD/MM/YYYY)
4. Click "Check" to calculate your eligibility date
5. View your results, including:
   - When you can apply for citizenship
   - Remaining absence days for both periods

## CSV Import Format

For bulk trip entry, use the following format:
```
DD/MM/YYYY, DD/MM/YYYY
DD/MM/YYYY, DD/MM/YYYY
```

Example:
```
01/01/2023, 15/01/2023
16/02/2023, 28/02/2023
```

## Disclaimer

This application is provided for general informational purposes only and is not affiliated with the Australian Government or the Department of Home Affairs. The results generated are estimates only and do not guarantee eligibility.

For authoritative information, please visit:
- [Citizenship Eligibility Criteria](https://immi.homeaffairs.gov.au/citizenship/become-a-citizen/permanent-resident)
- [Official Residence Calculator](https://immi.homeaffairs.gov.au/citizenship/become-a-citizen/permanent-resident/residence-calculator)
- [Request Movement Records](https://immi.homeaffairs.gov.au/entering-and-leaving-australia/request-movement-records)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
