'use client';

export function BuyMeCoffee() {
  return (
    <div className="flex justify-center my-4">
      <a href="https://www.buymeacoffee.com/joynchen" target="_blank" rel="noopener noreferrer">
        <img
          src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
          alt="Buy Me A Coffee"
          style={{ height: '40px', width: '145px' }}
        />
      </a>
    </div>
  );
}