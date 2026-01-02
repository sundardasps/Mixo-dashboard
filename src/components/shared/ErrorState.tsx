export function ErrorState({ message }: { message: string }) {
  return (
    <div className="p-4 border border-red-200 bg-red-50 rounded">
      <p className="text-sm text-red-600">{message}</p>
    </div>
  );
}
