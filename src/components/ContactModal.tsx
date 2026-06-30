import { useState, useEffect } from 'react'
import { Mail, X, Send, Loader2, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setErrorMessage('')

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => {
          onClose()
          setStatus('idle')
        }, 3000)
      } else {
        throw new Error(data.message || 'Failed to send message')
      }
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.')
      setTimeout(() => {
        setStatus('idle')
        setErrorMessage('')
      }, 5000)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div 
        className="relative w-full max-w-lg bg-[var(--color-card)] border-2 border-[var(--color-border)] shadow-[8px_8px_0px_var(--color-shadow)] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b-2 border-[var(--color-border)]">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center border-2 border-[var(--color-border)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
              <Mail size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[var(--color-foreground)]">Send me a message</h2>
              <p className="text-xs text-[var(--color-muted-foreground)]">I'll get back to you as soon as possible</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center text-[var(--color-muted-foreground)] hover:bg-[var(--color-secondary)] hover:text-[var(--color-foreground)] transition-colors"
            disabled={status === 'sending'}
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5">
          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <CheckCircle2 size={48} className="text-[var(--color-success)] mb-4" />
              <h3 className="text-xl font-bold text-[var(--color-foreground)]">Message sent!</h3>
              <p className="text-[var(--color-muted-foreground)] mt-2">Thank you for reaching out. I'll respond shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[var(--color-foreground)] mb-1.5">
                  Your Name *
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border-2 border-[var(--color-border)] bg-[var(--color-card)] px-3 py-2 text-sm text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--color-ring)] focus:border-transparent disabled:opacity-50"
                  placeholder="John Doe"
                  disabled={status === 'sending'}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[var(--color-foreground)] mb-1.5">
                  Your Email *
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border-2 border-[var(--color-border)] bg-[var(--color-card)] px-3 py-2 text-sm text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--color-ring)] focus:border-transparent disabled:opacity-50"
                  placeholder="john@example.com"
                  disabled={status === 'sending'}
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-[var(--color-foreground)] mb-1.5">
                  Subject *
                </label>
                <input
                  id="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full border-2 border-[var(--color-border)] bg-[var(--color-card)] px-3 py-2 text-sm text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--color-ring)] focus:border-transparent disabled:opacity-50"
                  placeholder="Let's work together"
                  disabled={status === 'sending'}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[var(--color-foreground)] mb-1.5">
                  Message *
                </label>
                <textarea
                  id="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full border-2 border-[var(--color-border)] bg-[var(--color-card)] px-3 py-2 text-sm text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)] resize-none focus:outline-none focus:ring-2 focus:ring-[var(--color-ring)] focus:border-transparent disabled:opacity-50"
                  placeholder="Tell me about your project or idea..."
                  disabled={status === 'sending'}
                />
              </div>

              {status === 'error' && (
                <div className="p-3 border-2 border-[var(--color-destructive)] bg-[var(--color-destructive)]/10 text-sm text-[var(--color-destructive)]">
                  {errorMessage}
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}