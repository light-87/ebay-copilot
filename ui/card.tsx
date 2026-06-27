/**
 * Card archetype view: a single-entity detail panel with status badges and
 * grouped field sections. Backs `ui://ebay/card.html` and renders one order,
 * offer, inventory item, dispute, or seller standards profile.
 */

import type { ReactNode } from 'react';
import type { CardBadge, CardViewModel } from '../src/tools/ui/view-models.ts';
import { AppShell, EmptyState, mount, useViewModel } from './host.tsx';

/** Maps a badge tone to its CSS modifier class. */
function badgeClass(tone: CardBadge['tone']): string {
  return tone && tone !== 'neutral' ? `badge badge--${tone}` : 'badge';
}

/** Renders the header, badges, and sections of a detail card. */
function Card({ view }: { view: CardViewModel }): ReactNode {
  return (
    <div class="card-view">
      <div class="card-header">
        {view.title ? <h1 class="view-title">{view.title}</h1> : null}
        {view.subtitle ? <span class="card-subtitle">{view.subtitle}</span> : null}
      </div>
      {view.badges && view.badges.length > 0 ? (
        <div class="badges">
          {view.badges.map((badge, index) => (
            <span key={`${badge.label}-${index}`} class={badgeClass(badge.tone)}>
              {badge.label}
            </span>
          ))}
        </div>
      ) : null}
      {view.sections.map((section, sectionIndex) => (
        <div key={section.heading ?? sectionIndex} class="card-section">
          {section.heading ? <h2>{section.heading}</h2> : null}
          {section.fields.map((field, fieldIndex) => (
            <div key={`${field.label}-${fieldIndex}`} class="field">
              <span class="field-label">{field.label}</span>
              <span class="field-value">{field.value === null ? '—' : field.value}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/** Top-level card app: handshake state plus the rendered card. */
function CardApp(): ReactNode {
  const { view, isConnected, error } = useViewModel('card');
  return (
    <AppShell isConnected={isConnected} error={error}>
      {view ? <Card view={view} /> : <EmptyState label="No details" />}
    </AppShell>
  );
}

mount(<CardApp />);
