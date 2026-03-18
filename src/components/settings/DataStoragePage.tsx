import { ArrowLeft, HardDrive, Image, Database, Download } from 'lucide-react';
import { Button } from '../ui/button';
import { DataProvider, useData } from './contexts/DataContext';
import { SettingsSection } from './shared/SettingsSection';
import { Progress } from '../ui/progress';

interface DataStoragePageProps {
  onBack: () => void;
}

function DataStoragePageContent({ onBack }: DataStoragePageProps) {
  const { storage, clearCache, clearImageCache, downloadData, isLoading } = useData();

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 MB';
    const mb = bytes / 1024 / 1024;
    return `${mb.toFixed(1)} MB`;
  };

  const getPercentage = (value: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((value / total) * 100);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-[480px] mx-auto">
      {/* Status bar removed - PWA/WebView mobile */}
      
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center justify-between h-14 px-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="h-9 w-9 p-0">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-semibold">Data & Storage</h1>
          <div className="w-9" />
        </div>
      </header>
      
      <main className="flex-1 overflow-auto pb-6">
        <div className="px-4 pt-4 pb-3 border-b border-border">
          <p className="text-sm text-muted-foreground">
            Manage your app storage and data
          </p>
        </div>

        {isLoading ? (
          <div className="text-center text-muted-foreground py-12">
            <div className="w-6 h-6 border-2 border-primary/20 border-t-primary rounded-full animate-spin mx-auto" />
          </div>
        ) : (
          <div className="px-4 py-4 space-y-6">
            {/* Storage Overview */}
            <SettingsSection title="Storage Usage">
              <div className="p-4 bg-white border border-gray-200 rounded-xl space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Total Storage</span>
                    <span className="text-sm text-muted-foreground">
                      {formatSize(storage.total)}
                    </span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>

                {/* Cache */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <HardDrive className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Cache</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {formatSize(storage.cacheSize)}
                    </span>
                  </div>
                  <Progress 
                    value={getPercentage(storage.cacheSize, storage.total)} 
                    className="h-1.5" 
                  />
                </div>

                {/* Images */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Image className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Images</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {formatSize(storage.imageSize)}
                    </span>
                  </div>
                  <Progress 
                    value={getPercentage(storage.imageSize, storage.total)} 
                    className="h-1.5" 
                  />
                </div>

                {/* Data */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Database className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Data</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {formatSize(storage.dataSize)}
                    </span>
                  </div>
                  <Progress 
                    value={getPercentage(storage.dataSize, storage.total)} 
                    className="h-1.5" 
                  />
                </div>
              </div>
            </SettingsSection>

            {/* Clear Storage */}
            <SettingsSection title="Clear Storage">
              <div className="p-4 bg-white border border-gray-200 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium">Clear Cache</p>
                    <p className="text-xs text-muted-foreground">
                      Free up {formatSize(storage.cacheSize)}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearCache}
                    disabled={storage.cacheSize === 0}
                  >
                    Clear
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium">Clear Image Cache</p>
                    <p className="text-xs text-muted-foreground">
                      Free up {formatSize(storage.imageSize)}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearImageCache}
                    disabled={storage.imageSize === 0}
                  >
                    Clear
                  </Button>
                </div>
              </div>
            </SettingsSection>

            {/* Data Export */}
            <SettingsSection title="Export Your Data">
              <div className="p-4 bg-white border border-gray-200 rounded-xl space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Download className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium mb-1">Download Your Data</p>
                    <p className="text-xs text-muted-foreground mb-3">
                      Export all your listings, messages, and preferences as a JSON file
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={downloadData}
                    >
                      Request Export
                    </Button>
                  </div>
                </div>
              </div>
            </SettingsSection>

            {/* GDPR Info */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <p className="text-xs text-blue-900 font-semibold mb-1">
                🔒 Your Data Rights
              </p>
              <p className="text-xs text-blue-800">
                Under GDPR and CCPA, you have the right to access, download, and delete your data at any time. Data exports are provided in machine-readable JSON format.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function DataStoragePage(props: DataStoragePageProps) {
  return (
    <DataProvider>
      <DataStoragePageContent {...props} />
    </DataProvider>
  );
}