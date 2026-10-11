import { useEffect, useRef, useState } from 'react';
import { FiCornerDownLeft, FiSearch } from 'react-icons/fi';
import { matchCommand } from '../data';

// Mounted only while open, so every open starts with a fresh query.
// Native <dialog> gives us focus trapping, Esc-to-close and a top-layer backdrop for free.
export default function CommandPalette({ commands, onClose }) {
  const dialog = useRef(null);
  const [query, setQuery] = useState('');
  const [sel, setSel] = useState(0);
  const list = commands.filter((c) => matchCommand(c, query));

  useEffect(() => {
    dialog.current.showModal();
  }, []);

  const run = (cmd) => {
    dialog.current.close();
    cmd.run();
  };

  const onKeyDown = (e) => {
    if (!list.length) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const step = e.key === 'ArrowDown' ? 1 : -1;
      setSel((s) => (s + step + list.length) % list.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      run(list[sel]);
    }
  };

  return (
    <dialog
      ref={dialog}
      className="palette"
      aria-label="Command menu"
      onClose={onClose}
      onClick={(e) => e.target === dialog.current && dialog.current.close()}
    >
      <div className="palette-inner">
        <div className="palette-search">
          <FiSearch aria-hidden="true" />
          <input
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSel(0);
            }}
            onKeyDown={onKeyDown}
            placeholder="Jump to a section, copy email, open GitHub…"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={list[sel] ? `cmd-${list[sel].id}` : undefined}
            aria-label="Search commands"
          />
          <kbd>esc</kbd>
        </div>

        <ul id="palette-list" role="listbox" aria-label="Commands">
          {list.length === 0 && <li className="palette-empty">No matches for “{query}”</li>}
          {list.map((cmd, i) => {
            const Icon = cmd.icon;
            return (
              <li key={cmd.id} role="presentation">
                {(i === 0 || list[i - 1].group !== cmd.group) && <p className="palette-group">{cmd.group}</p>}
                <div
                  id={`cmd-${cmd.id}`}
                  role="option"
                  aria-selected={i === sel}
                  className="palette-item"
                  onMouseMove={() => setSel(i)}
                  onClick={() => run(cmd)}
                >
                  <Icon aria-hidden="true" />
                  <span>{cmd.label}</span>
                  {i === sel && <FiCornerDownLeft className="palette-enter" aria-hidden="true" />}
                </div>
              </li>
            );
          })}
        </ul>

        <footer className="palette-foot">
          <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
          <span><kbd>↵</kbd> select</span>
          <span><kbd>esc</kbd> close</span>
        </footer>
      </div>
    </dialog>
  );
}
