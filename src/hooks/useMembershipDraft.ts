import { useEffect, useRef, useState } from "react";
import type { MembershipApplicationFormData } from "@/types";

// Retain the storage key so existing six-step drafts can be migrated.
const draftKey = "dbdf-membership-draft-v1";
const legacyStepMap = [0, 0, 1, 2, 3, 4];
const draftLifetime = 3 * 24 * 60 * 60 * 1000;

type Draft = {
  version: 2;
  values: MembershipApplicationFormData;
  step: number;
  expiresAt: number;
};

export function useMembershipDraft(values: MembershipApplicationFormData, step: number) {
  const initialValues = useRef(values).current;
  const [ready, setReady] = useState(false);
  const [pending, setPending] = useState<Draft | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(draftKey);
      if (raw) {
        let draft: Draft | null = null;
        try {
          const parsed = JSON.parse(raw);
          const now = Date.now();
          if (
            (parsed?.version === 1 || parsed?.version === 2) &&
            Number.isInteger(parsed.step) && parsed.step >= 0 && parsed.step <= (parsed.version === 1 ? 5 : 4) &&
            Number.isFinite(parsed.expiresAt) &&
            parsed.expiresAt > now && parsed.expiresAt <= now + draftLifetime &&
            parsed.values && typeof parsed.values === "object" &&
            Object.keys(initialValues).every((key) =>
              typeof parsed.values[key] === "string" && parsed.values[key].length <= 10000)
          ) {
            const restored = { ...initialValues };
            for (const key of Object.keys(restored) as (keyof MembershipApplicationFormData)[]) {
              restored[key] = parsed.values[key];
            }
            // Merge the old Company/Owner positions without discarding any answers.
            const restoredStep = parsed.version === 1 ? legacyStepMap[parsed.step] : parsed.step;
            draft = { version: 2, values: restored, step: restoredStep, expiresAt: parsed.expiresAt };
          }
        } catch { /* Invalid drafts are discarded below. */ }
        if (draft) setPending(draft);
        else {
          localStorage.removeItem(draftKey);
          setMessage("The previous draft expired or could not be restored. Start a new application.");
        }
      }
    } catch {
      setMessage("Saved drafts are unavailable in this browser. You can still complete the form.");
    }
    setReady(true);
  }, [initialValues]);

  useEffect(() => {
    if (!ready || !enabled || pending) return;
    try {
      const expiry = Date.now() + draftLifetime;
      localStorage.setItem(draftKey, JSON.stringify({ version: 2, values, step, expiresAt: expiry }));
      setExpiresAt(expiry);
      setMessage("Draft saved on this device. Expires 3 days after your last change.");
    } catch {
      setMessage("Could not save your latest changes. Keep this tab open or download your PDF.");
    }
  }, [values, step, enabled, pending, ready]);

  useEffect(() => {
    const expiry = pending?.expiresAt ?? expiresAt;
    if (!expiry) return;
    function expire() {
      if (Date.now() < expiry!) return;
      setEnabled(false);
      setPending(null);
      setExpiresAt(null);
      try {
        localStorage.removeItem(draftKey);
        setMessage("Your saved draft expired. Current answers remain in this tab.");
      } catch {
        setMessage("Your draft expired but could not be removed. Clear this site's browser data to remove it.");
      }
    }
    const timer = window.setTimeout(expire, Math.max(0, expiry - Date.now()));
    window.addEventListener("focus", expire);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("focus", expire);
    };
  }, [expiresAt, pending]);

  function clear() {
    setEnabled(false);
    setPending(null);
    setExpiresAt(null);
    try {
      localStorage.removeItem(draftKey);
      setMessage("Saved draft cleared. Current answers remain in this tab.");
    } catch {
      setMessage("Could not remove the saved draft. Clear this site's browser data to remove it.");
    }
  }

  function resume() {
    if (!pending) return null;
    if (pending.expiresAt <= Date.now()) {
      clear();
      setMessage("Your saved draft expired. Please start a new application.");
      return null;
    }
    const draft = pending;
    setPending(null);
    setEnabled(true);
    return draft;
  }

  function toggle(checked: boolean) {
    if (checked) setEnabled(true);
    else clear();
  }

  return { ready, pending, enabled, message, clear, resume, toggle };
}
