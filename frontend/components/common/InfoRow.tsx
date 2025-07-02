import React, { JSX } from 'react'

function InfoRow(props: { label: string; value: React.ReactNode }): JSX.Element {
  const { label, value } = props;
  return (
      <div className="flex justify-between items-start gap-4 py-2 border-b border-gray-200 dark:border-gray-700">
    <span className="font-medium text-gray-600 dark:text-gray-300 w-1/3">{label}</span>
    <span className="text-gray-900 dark:text-white text-right w-2/3 break-words">{value || '—'}</span>
  </div>
  )
}

export default InfoRow