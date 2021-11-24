import { startOfWeek, endOfWeek, startOfYear, endOfMonth, startOfMonth } from 'date-fns';

const CustomStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};
  
const Expenses = ['Mortgage or rent', 'Property taxes', 'Car payment', 'Parking fees', 'Groceries', 'Restaurants', 'Electricity', 'Internet', 'Adults’ clothing',
        'Children’s clothing', 'Primary care', 'Medications', 'Health insurance', 'Life insurance', 'Cleaning supplies', 'Laundry detergent', 'Haircuts', 'Cosmetics ', 'Movies', 'Christmas',
        'Children’s college','Financial planning','Student loans','Credit cards']

const Income = ['Monthly Income', 'Business Income'];

         const weekFirstDay = startOfWeek(new Date(), { weekStartsOn: 1 });
         const weekFirstDayInMilliSeconds = new Date(weekFirstDay).getTime();
         
         const weekLastDay = endOfWeek(new Date(), { weekStartsOn: 1 });
         const weekLastDayInMilliSeconds = new Date(weekLastDay).getTime();
         
         const monthFirstDay = startOfMonth(new Date());
         const monthFirstDayInMilliSeconds = new Date(monthFirstDay).getTime();
         
         const monthLastDay = endOfMonth(new Date());
         const monthLastDayInMilliSeconds = new Date(monthLastDay).getTime();

         const yearFirstDay = startOfYear(new Date());
         const yearFirstDayInMilliSeconds = new Date(yearFirstDay).getTime();


export {
  CustomStyles, Expenses, Income, weekFirstDayInMilliSeconds, weekLastDayInMilliSeconds, monthFirstDayInMilliSeconds,
  monthLastDayInMilliSeconds,yearFirstDayInMilliSeconds}