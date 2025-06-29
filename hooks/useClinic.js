"use client";

import { createContext, useContext, useReducer, useEffect } from "react";

const STORAGE_KEY = "clinicWizardState";

const ClinicContext = createContext();

/* ---------- initial shape ---------- */
const initialState = {
  wizardId: null,
  currentStep: 1,
  data: {
    clinic_name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    time_zone: "",
    acceptedBAA: false,
    twilio_sid: "",
    twilio_token: "",
    wa_from: "",
    send_whatsapp: false,
    gcal_refresh_token: "",
    gcal_id: "",
    insurances: "",
    phone: "",
  },
  stepCompleted: {
    1: false,
    2: false,
    3: false,
  },
  loading: false,
  error: null,
};

/* ---------- reducer ---------- */
function clinicReducer(state, action) {
  switch (action.type) {
    case "SET_WIZARD_ID":
      return { ...state, wizardId: action.payload };

    case "SET_CURRENT_STEP":
      return { ...state, currentStep: action.payload };

    case "UPDATE_DATA":
      return {
        ...state,
        data: { ...state.data, ...action.payload },
      };

    case "COMPLETE_STEP":
      return {
        ...state,
        stepCompleted: { ...state.stepCompleted, [action.payload]: true },
      };

    case "SET_LOADING":
      return { ...state, loading: action.payload };

    case "SET_ERROR":
      return { ...state, error: action.payload };

    case "RESET":
      /** clear persistence, too */
      if (typeof window !== "undefined") {
        localStorage.removeItem(STORAGE_KEY);
      }
      return initialState;

    case "CLEAR_AFTER_FINISH":
      if (typeof window !== "undefined") localStorage.removeItem(STORAGE_KEY);
      return { ...initialState }; // no redirect side-effects

    default:
      return state;
  }
}

/* ---------- initialise from localStorage (runs only in browser) ---------- */
function initState() {
  if (typeof window === "undefined") return initialState;

  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved) {
      /* merge to keep any new keys that weren't in old saves */
      return {
        ...initialState,
        ...saved,
        data: { ...initialState.data, ...saved.data },
        stepCompleted: {
          ...initialState.stepCompleted,
          ...saved.stepCompleted,
        },
      };
    }
  } catch (_) {
    /* ignore bad JSON */
  }
  return initialState;
}

/* ---------- provider ---------- */
export function ClinicProvider({ children }) {
  const [state, dispatch] = useReducer(clinicReducer, initialState, initState);

  /* keep state in localStorage so a full page reload (OAuth redirect) restores it */
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (_) {
      /* silent fail – storage quota/full */
    }
  }, [state]);

  return (
    <ClinicContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ClinicContext.Provider>
  );
}

export function useClinic() {
  const context = useContext(ClinicContext);
  if (!context) {
    throw new Error("useClinic must be used within a ClinicProvider");
  }
  return context;
}
