
import { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const DocumentUpload = () => {
  const [uploadedDocs, setUploadedDocs] = useState([
    { id: 1, name: 'Government ID', status: 'uploaded', file: 'passport.pdf' },
    { id: 2, name: 'Address Proof', status: 'uploaded', file: 'utility_bill.pdf' },
    { id: 3, name: 'Educational Certificate', status: 'pending', file: null },
    { id: 4, name: 'Previous Employment', status: 'pending', file: null },
    { id: 5, name: 'Medical Certificate', status: 'pending', file: null },
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentDocId, setCurrentDocId] = useState<number | null>(null);

  const handleFileUpload = (docId: number) => {
    setCurrentDocId(docId);
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && currentDocId) {
      setUploadedDocs(prev => 
        prev.map(doc => 
          doc.id === currentDocId 
            ? { ...doc, status: 'uploaded', file: file.name }
            : doc
        )
      );
      setCurrentDocId(null);
    }
    // Reset the input value to allow selecting the same file again
    if (event.target) {
      event.target.value = '';
    }
  };

  const uploadedCount = uploadedDocs.filter(doc => doc.status === 'uploaded').length;
  const progress = (uploadedCount / uploadedDocs.length) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Document Upload</CardTitle>
        <CardDescription>
          Upload required documents to complete your onboarding
        </CardDescription>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{uploadedCount}/{uploadedDocs.length} documents</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {uploadedDocs.map((doc) => (
          <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-3">
              <FileText className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium">{doc.name}</p>
                {doc.file && (
                  <p className="text-sm text-gray-500">{doc.file}</p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {doc.status === 'uploaded' ? (
                <div className="flex items-center space-x-2 text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm">Uploaded</span>
                </div>
              ) : (
                <Button 
                  size="sm" 
                  onClick={() => handleFileUpload(doc.id)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Upload className="h-4 w-4 mr-1" />
                  Upload
                </Button>
              )}
            </div>
          </div>
        ))}
        
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        />
      </CardContent>
    </Card>
  );
};

export default DocumentUpload;
