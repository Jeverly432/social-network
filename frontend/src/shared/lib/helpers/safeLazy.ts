import { type ComponentType, lazy, type LazyExoticComponent } from 'react';

interface IForceReloadConfig {
  maxRetries: number;
  storageKey?: string;
};

interface ISafeLazyConfigInit {
  forceReload?: false | Partial<IForceReloadConfig>;
  importRetries?: number;
};

interface ISafeLazyConfig {
  forceReload: IForceReloadConfig;
  importRetries: number;
};

const defaultStorageKey = 'forceReloadedImportFunctions';

export class ForceReloadStorage {
  public readonly storageKey: string;

  constructor(storageKey: string = defaultStorageKey) {
    this.storageKey = storageKey;
  }

  getMap(): Map<string, number> {
    const stored = sessionStorage.getItem(this.storageKey);

    try {
      const parsed: unknown = stored ? JSON.parse(stored) : {};
      return new Map(
        Array.isArray(parsed)
          ? parsed.filter(
            (value) => Array.isArray(value) && typeof value[0] === 'string' && typeof value[1] === 'number',
          )
          : undefined,
      );
    } catch (error) {
      console.error(error);
      return new Map();
    }
  }

  addFunction(functionName: string) {
    const stored = this.getMap();
    stored.set(functionName, (stored.get(functionName) ?? 0) + 1);
    this.save(stored);
  }

  removeFunction(functionName: string) {
    const stored = this.getMap();
    stored.delete(functionName);
    this.save(stored);
  }

  protected save(stored: Map<string, number>) {
    sessionStorage.setItem(this.storageKey, JSON.stringify([...stored.entries()]));
  }
}

export const createConfig = (init: ISafeLazyConfigInit = {}): ISafeLazyConfig => ({
  forceReload: {
    maxRetries: 1,
    ...(typeof init.forceReload === 'object'
      ? init.forceReload
      : init.forceReload === false
        ? { maxRetries: 0 }
        : undefined),
  },
  importRetries: typeof init.importRetries === 'number' ? init.importRetries : 0,
});

export const createSafeLazy = (config: ISafeLazyConfigInit = {}) => {
  const { forceReload, importRetries } = createConfig(config);
  const reloadStorage = new ForceReloadStorage(forceReload.storageKey);

  const safeLazy = <T>(
    importFunction: () => Promise<{ default: ComponentType<T> }>,
  ): LazyExoticComponent<ComponentType<T>> => {
    let retried = 0;
    const tryImport = async () => {
      try {
        return await importFunction();
      } catch (error) {
        console.error(error);

        if (retried < importRetries) {
          retried++;
          return tryImport();
        }

        throw error;
      }
    };
    const functionString = importFunction.toString();

    return lazy(async () => {
      try {
        const component = await tryImport();

        if (forceReload.maxRetries > 0) {
          reloadStorage.removeFunction(functionString);
        }
        return component;
      } catch (error) {
        if ((reloadStorage.getMap().get(functionString) ?? 0) < forceReload.maxRetries) {
          reloadStorage.addFunction(functionString);
          window.location.reload();
          return { default: () => null };
        }

        throw error;
      }
    });
  };

  return safeLazy;
};

export const safeLazy = createSafeLazy({
  importRetries: 3,
  forceReload: {
    maxRetries: 2,
  },
});