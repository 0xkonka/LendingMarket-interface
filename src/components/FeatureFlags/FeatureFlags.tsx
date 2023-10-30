import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

export enum FeatureFlag {
  MultiAssetZap = 'MultiAssetZap',
}

const useFeatureFlagValue = () => {
  const [featureFlags, setFeatureFlagState] = useState<Record<FeatureFlag, boolean>>(() => {
    const savedState = sessionStorage.getItem('feature_flags');
    return savedState
      ? JSON.parse(savedState)
      : Object.fromEntries(Object.values(FeatureFlag).map((v) => [v, false] as const));
  });

  const toggleFeatureFlag = useCallback((flag: FeatureFlag) => {
    setFeatureFlagState((currentFlags) => {
      const newValue = !currentFlags[flag];
      const newState = { ...currentFlags, [flag]: newValue };
      sessionStorage.setItem('feature_flags', JSON.stringify(newState));
      console.log(`Feature flag ${flag} is now ${newValue ? 'enabled' : 'disabled'}`);
      return newState;
    });
  }, []);

  return useMemo(
    () => ({
      featureFlags,
      toggleFeatureFlag,
    }),
    [featureFlags, toggleFeatureFlag]
  );
};

const FeatureFlagContext = createContext<ReturnType<typeof useFeatureFlagValue> | undefined>(
  undefined
);

const useFeatureFlagContext = () => {
  const value = useContext(FeatureFlagContext);
  if (!value) throw new Error('Cannot use useFeatureFlagContext outside of FeatureFlagProvider');
  return value;
};

export const FeatureFlagProvider = ({ children }: { children: ReactNode }) => {
  const value = useFeatureFlagValue();

  useEffect(() => {
    if (!window) return;
    Object.assign(window, {
      ff: Object.fromEntries(
        Object.values(FeatureFlag).map(
          (flag) => [`toggle${flag}`, () => value.toggleFeatureFlag(flag)] as const
        )
      ),
    });
  }, []);

  return <FeatureFlagContext.Provider value={value}>{children}</FeatureFlagContext.Provider>;
};

export const useFeatureFlags = () => {
  const { featureFlags } = useFeatureFlagContext();
  return featureFlags;
};

export const useFeatureFlag = (flag: FeatureFlag) => {
  const featureFlags = useFeatureFlags();
  return featureFlags[flag];
};
