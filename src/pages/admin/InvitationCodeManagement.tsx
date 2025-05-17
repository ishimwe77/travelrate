import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdmin } from '../../context/admin/AdminContext';

interface InvitationCode {
  code: string;
  vipLevel: number;
  status: 'used' | 'not_used';
  createdAt: string;
}

const InvitationCodeManagement: React.FC = () => {
  const { generateInvitationCodes, fetchInvitationCodes, invitationCodes, isLoading, error } = useAdmin();
  const [vipLevel, setVipLevel] = useState<number>(1);
  const [numberOfCodes, setNumberOfCodes] = useState<number>(1);
  const [generatedCodes, setGeneratedCodes] = useState<string[]>([]);
  const [showGeneratedCodes, setShowGeneratedCodes] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchInvitationCodes();
  }, [fetchInvitationCodes]);

  const handleGenerateCodes = async () => {
    try {
      const codes = await generateInvitationCodes(vipLevel, numberOfCodes);
      setGeneratedCodes(codes);
      setShowGeneratedCodes(true);
      setSuccessMessage(`${numberOfCodes} invitation code(s) for VIP Level ${vipLevel} generated successfully.`);
      
      // Refresh the invitation codes list
      fetchInvitationCodes();
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (err) {
      console.error('Failed to generate invitation codes:', err);
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
      .then(() => {
        // Show temporary success message
        const codeElement = document.getElementById(`code-${code}`);
        if (codeElement) {
          const originalText = codeElement.textContent;
          codeElement.textContent = 'Copied!';
          setTimeout(() => {
            if (codeElement) codeElement.textContent = originalText;
          }, 1000);
        }
      })
      .catch(err => {
        console.error('Failed to copy code:', err);
      });
  };

  return (
    <AdminLayout>
      <div className="pb-5 border-b border-gray-200 mb-5">
        <h1 className="text-2xl font-bold text-gray-900">Manage Invitation Codes</h1>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          <p>{successMessage}</p>
        </div>
      )}

      {/* Generate Codes Form */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Generate New Invitation Codes</h2>
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="vipLevel" className="block text-sm font-medium text-gray-700">
              VIP Level
            </label>
            <div className="mt-1">
              <select
                id="vipLevel"
                name="vipLevel"
                value={vipLevel}
                onChange={(e) => setVipLevel(Number(e.target.value))}
                className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
              >
                <option value={1}>VIP 1</option>
                <option value={2}>VIP 2</option>
                <option value={3}>VIP 3</option>
              </select>
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="numberOfCodes" className="block text-sm font-medium text-gray-700">
              Number of Codes
            </label>
            <div className="mt-1">
              <input
                type="number"
                name="numberOfCodes"
                id="numberOfCodes"
                min={1}
                max={10}
                value={numberOfCodes}
                onChange={(e) => setNumberOfCodes(Number(e.target.value))}
                className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>

        <div className="mt-5">
          <button
            type="button"
            onClick={handleGenerateCodes}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Generate Codes
          </button>
        </div>
      </div>

      {/* Generated Codes */}
      {showGeneratedCodes && generatedCodes.length > 0 && (
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Generated Invitation Codes</h2>
          <div className="overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Invitation Code
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {generatedCodes.map((code) => (
                  <tr key={code}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <span id={`code-${code}`}>{code}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleCopyCode(code)}
                        className="text-primary hover:text-primary-dark"
                      >
                        Copy
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* All Invitation Codes */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">All Invitation Codes</h2>
        
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : invitationCodes.length === 0 ? (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No invitation codes</h3>
            <p className="mt-1 text-sm text-gray-500">
              Generate new invitation codes to get started.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Code
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    VIP Level
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Created At
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {invitationCodes.map((code) => (
                  <tr key={code.code}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {code.code}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        VIP {code.vipLevel}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          code.status === 'not_used'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {code.status === 'not_used' ? 'Not Used' : 'Used'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(code.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default InvitationCodeManagement;
