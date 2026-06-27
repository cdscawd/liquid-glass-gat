import { useCallback, useEffect, useRef, useState } from "react";
import { ButtonLiquidGlass } from "../components/ButtonLiquidGlass";
import { CyberspaceBackground } from "../components/CyberspaceBackground";
import { LiquidGlassProvider } from "../lib/liquid-glass";
import type { LiquidGlassParams } from "../lib/liquid-glass";
import { DEMO_SECTIONS, ThemeSection } from "./DemoSections";
import { DemoSidebar } from "./DemoSidebar";
import { DEMO_NAV_ITEMS } from "./demoNav";
import "./DemoShowcase.scss";
  const [showDetail, setShowDetail] = useState(false);
  const [activeId, setActiveId] = useState(DEMO_NAV_ITEMS[0]?.id ?? "theme");
  });
  const mainRef = useRef<HTMLElement>(null);
  const scrollLockRef = useRef(false);
    const el = document.getElementById(id);
    if (!el) return;
    scrollLockRef.current = true;
    setActiveId(id);
    el.scrollIntoView({ behavior: "smooth", block: "start" });
      scrollLockRef.current = false;
    }, 600);
  }, []);
    if (!showDetail) return;

    ).filter(Boolean) as HTMLElement[];
    if (sections.length === 0) return;
        if (scrollLockRef.current) return;
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const top = visible[0];
        if (top?.target.id) setActiveId(top.target.id);
      { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [showDetail]);
        {!showDetail ? (
          <div className="demo-showcase demo-showcase--landing">
            <ButtonLiquidGlass
              size="lg"
              className="demo-showcase__cta"
              glassParams={{ borderRadius: 10, edgeFalloff: 30, strength: 2 }}
              onClick={() => setShowDetail(true)}
            >
              <span className="demo-showcase__cta-eyebrow">Open</span>
              <span className="demo-showcase__cta-title">
                <span className="demo-showcase__cta-title-line">Liquid Glass</span>
                <span className="demo-showcase__cta-title-highlight">
                  Components
                </span>
              </span>
            </ButtonLiquidGlass>
          </div>
        ) : (
          <div className="demo-showcase">
            <DemoSidebar activeId={activeId} onNavigate={scrollToSection} />
            <main ref={mainRef} className="demo-showcase__main">
              <header className="demo-showcase__hero">
                <h1 className="demo-showcase__title">
                  Liquid Glass Components
                </h1>
                <p className="demo-showcase__subtitle">
                  各组件不同 glassParams 配置 · 展开查看代码 · 左侧菜单快速定位
                </p>
              </header>
              <ThemeSection
                globalGlass={globalGlass}
                onThemeChange={setGlobalGlass}
              />
              {DEMO_SECTIONS.map(({ id, Component }) => (
                <Component key={id} />
              ))}
              <footer className="demo-showcase__footer">
                赛博隧道 Three.js 背景 · 玻璃折射建议在 Chrome 查看
              </footer>
            </main>
          </div>
        )}
  );
export default DemoShowcase;