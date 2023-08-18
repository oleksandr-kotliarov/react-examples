import { useRouter } from 'next/router';
import { useContext } from 'react';
import { PaymentContext } from '../context/PaymentContext';
import { PaymentPeriod, PaymentPlan } from '../types/PaymentTypes';

export const usePaymentConfig = () => {
  const { plan, period, setPeriod, setPlan } = useContext(PaymentContext);
  const router = useRouter();

  const getCurrentPlan = () => {
    return router.query.plan ? (router.query.plan as PaymentPlan) : plan;
  };

  const getCurrentPeriod = () => period;

  const togglePeriod = () => {
    const newPeriod =
      period === PaymentPeriod.monthly
        ? PaymentPeriod.annual
        : PaymentPeriod.monthly;
    setPeriod(newPeriod);
  };

  const changePlan = (newPlan: PaymentPlan) => {
    if (newPlan === PaymentPlan.basicTrial) {
      setPeriod(PaymentPeriod.monthly);
    }

    /** Setting the plan to the query param */
    router.replace({
      pathname: '/payment',
      query: { ...router.query, plan: newPlan },
    });

    setPlan(newPlan);
  };

  return { getCurrentPeriod, getCurrentPlan, togglePeriod, changePlan };
};
