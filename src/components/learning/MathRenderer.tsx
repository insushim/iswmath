'use client';

import { useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface MathRendererProps {
  content: string;
  inline?: boolean;
  className?: string;
}

export function MathRenderer({ content, inline = false, className = '' }: MathRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // LaTeX 수식 패턴 처리
    const processContent = (text: string) => {
      // 블록 수식 처리 ($$...$$)
      text = text.replace(/\$\$([\s\S]*?)\$\$/g, (_, math) => {
        try {
          return katex.renderToString(math.trim(), {
            displayMode: true,
            throwOnError: false,
            trust: true,
          });
        } catch (error) {
          console.error('KaTeX error:', error);
          return `<span class="text-red-500">[수식 오류]</span>`;
        }
      });

      // 인라인 수식 처리 ($...$)
      text = text.replace(/\$([^$]+)\$/g, (_, math) => {
        try {
          return katex.renderToString(math.trim(), {
            displayMode: false,
            throwOnError: false,
            trust: true,
          });
        } catch (error) {
          console.error('KaTeX error:', error);
          return `<span class="text-red-500">[수식 오류]</span>`;
        }
      });

      // 분수 간편 표기 처리 (\frac{a}{b})
      text = text.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, (_, num, den) => {
        try {
          return katex.renderToString(`\\frac{${num}}{${den}}`, {
            displayMode: false,
            throwOnError: false,
          });
        } catch {
          return `<span class="text-red-500">[분수 오류]</span>`;
        }
      });

      return text;
    };

    containerRef.current.innerHTML = processContent(content);
  }, [content]);

  return (
    <div
      ref={containerRef}
      className={`math-content ${inline ? 'inline' : 'block'} ${className}`}
    />
  );
}
