import { cn } from '@/lib/utils';

interface CalloutProps {
  type?: 'info' | 'tip' | 'warning' | 'danger';
  children: React.ReactNode;
}

const styles = {
  info: 'bg-blue-50 border-blue-400 text-blue-900 dark:bg-blue-950 dark:border-blue-600 dark:text-blue-100',
  tip: 'bg-green-50 border-green-400 text-green-900 dark:bg-green-950 dark:border-green-600 dark:text-green-100',
  warning: 'bg-yellow-50 border-yellow-400 text-yellow-900 dark:bg-yellow-950 dark:border-yellow-600 dark:text-yellow-100',
  danger: 'bg-red-50 border-red-400 text-red-900 dark:bg-red-950 dark:border-red-600 dark:text-red-100',
};

const icons = {
  info: 'ℹ️',
  tip: '💡',
  warning: '⚠️',
  danger: '🔥',
};

export function Callout({ type = 'info', children }: CalloutProps) {
  return (
    <div className={cn('border-l-4 rounded-r-lg px-4 py-3 my-4 text-sm', styles[type])}>
      <span className="mr-2">{icons[type]}</span>
      {children}
    </div>
  );
}
