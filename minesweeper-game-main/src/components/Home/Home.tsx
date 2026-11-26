import { BrandIcon } from '../Icons';
import type { Difficulty } from '../../types';

interface Props {
  onPlay: (diff: Difficulty) => void;
}

const MODES: { diff: Difficulty; label: string; meta: string }[] = [
  { diff: 'easy', label: 'Easy', meta: '8×8 · 10 mines' },
  { diff: 'medium', label: 'Medium', meta: '14×14 · 30 mines' },
  { diff: 'hard', label: 'Hard', meta: '20×20 · 70 mines' },
];

const Home = ({ onPlay }: Props) => (
  <div className="home-shell">
    <div className="home-card">
      <div className="home-brand">
        <div className="brand-mark">
          <BrandIcon />
        </div>
        <div className="brand-text">
          Minesweeper<span className="dot">.</span>
        </div>
      </div>

      <p className="home-sub">Klasik tebak ranjau, bergaya papan kayu vintage.</p>

      <div className="home-modes">
        {MODES.map(({ diff, label, meta }) => (
          <button key={diff} className="home-mode-btn" onClick={() => onPlay(diff)}>
            <span className="home-mode-lbl">{label}</span>
            <span className="home-mode-meta">{meta}</span>
          </button>
        ))}
      </div>

      <button className="restart-pill home-play-btn" onClick={() => onPlay('easy')}>
        Play Now
      </button>
    </div>

  </div>
);

export default Home;
