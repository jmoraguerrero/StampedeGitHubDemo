import { AlertTriangle, CheckCircle2, CreditCard, ShoppingCart } from 'lucide-react'
import { cartSnapshots } from '../data/demoScript'

type CartPanelProps = {
  step: number
}

export function CartPanel({ step }: CartPanelProps) {
  const cart = cartSnapshots[step] ?? cartSnapshots[1]

  return (
    <aside className="sticky top-6 rounded-3xl border border-stampede-border bg-white p-6 text-stampede-charcoal shadow-xl">
      <div className="mb-5 flex items-center gap-3 border-b border-stampede-border pb-4 text-stampede-red">
        <ShoppingCart className="h-5 w-5" />
        <div>
          <div className="font-serif text-xl font-bold text-stampede-charcoal">Your Stampede Cart</div>
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-stampede-red">
            Agent managed checkout
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {cart.items.map((item) => (
          <div key={item.id} className="rounded-2xl border border-stampede-border bg-stampede-cream/50 p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm font-bold">{item.name}</div>
                <div className="mt-1 text-xs text-gray-500">{item.detail}</div>
              </div>
              <div className="text-sm font-bold">{item.price}</div>
            </div>
            {item.warning ? (
              <div className="mt-3 flex items-center gap-2 rounded-xl border border-yellow-200 bg-yellow-50 p-2 text-xs font-bold text-yellow-800">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                {item.warning}
              </div>
            ) : null}
          </div>
        ))}
      </div>

      <div className="mt-5 space-y-2 border-t border-stampede-border pt-4">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Subtotal</span>
          <span>{cart.subtotal}</span>
        </div>
        <div className="flex items-center justify-between font-serif text-2xl font-bold">
          <span>Total</span>
          <span>{cart.total}</span>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-3 text-sm font-bold text-green-700">
        <CheckCircle2 className="h-4 w-4 text-green-600" />
        {cart.badge}
      </div>

      <button
        type="button"
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-stampede-red px-5 py-3 text-sm font-bold text-white transition hover:bg-stampede-dark-red"
      >
        <CreditCard className="h-4 w-4" />
        Proceed to Checkout
      </button>
    </aside>
  )
}
