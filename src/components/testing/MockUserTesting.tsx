/**
 * Mock User Testing Component
 * UI para verificar y cambiar entre usuarios mock
 */

import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { 
  User, 
  Mail, 
  Key, 
  MapPin, 
  Users, 
  Package, 
  Building2,
  Star,
  CheckCircle,
  Crown,
  Shield,
  AlertCircle
} from 'lucide-react';
import { getTestUser, logUserSummary, compareUsers, type TestUserId } from '../../data/testingUtils';

interface MockUserTestingProps {
  onUserChange?: (userId: TestUserId) => void;
}

export function MockUserTesting({ onUserChange }: MockUserTestingProps) {
  const [selectedUser, setSelectedUser] = useState<TestUserId>('ana');
  const testData = getTestUser(selectedUser);

  const handleUserChange = (userId: TestUserId) => {
    setSelectedUser(userId);
    logUserSummary(userId);
    onUserChange?.(userId);
  };

  const users: { id: TestUserId; color: string; emoji: string }[] = [
    { id: 'ana', color: 'bg-blue-500', emoji: '👩‍🎓' },
    { id: 'carlos', color: 'bg-green-500', emoji: '👨‍💼' },
    { id: 'maria', color: 'bg-purple-500', emoji: '👩‍🏫' },
  ];

  const getPlanColor = (plan?: string) => {
    switch (plan) {
      case 'free': return 'bg-gray-500/10 text-gray-700';
      case 'plus': return 'bg-blue-500/10 text-blue-700';
      case 'pro': return 'bg-purple-500/10 text-purple-700';
      default: return 'bg-gray-500/10 text-gray-700';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Crown className="w-3 h-3" />;
      case 'moderator': return <Shield className="w-3 h-3" />;
      default: return <User className="w-3 h-3" />;
    }
  };

  const adminGroups = testData.groups.filter(g => g.role === 'admin');
  const modGroups = testData.groups.filter(g => g.role === 'moderator');
  const memberGroups = testData.groups.filter(g => g.role === 'member');

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">🧪 Mock User Testing</h1>
          <p className="text-muted-foreground">
            Sistema de testing con 3 perfiles completos
          </p>
        </div>

        {/* User Selector */}
        <Card>
          <CardHeader>
            <CardTitle>Seleccionar Usuario de Testing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {users.map(({ id, color, emoji }) => {
                const data = getTestUser(id);
                const isSelected = selectedUser === id;
                
                return (
                  <button
                    key={id}
                    onClick={() => handleUserChange(id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      isSelected 
                        ? 'border-primary bg-primary/5' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center text-2xl`}>
                        {emoji}
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-semibold">{data.user.name}</div>
                        <div className="text-xs text-muted-foreground">@{data.user.username}</div>
                        <div className="flex gap-1 mt-1">
                          <Badge className={getPlanColor(data.user.plan)}>
                            {data.user.plan?.toUpperCase()}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {data.user.accountType}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* User Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Información Básica
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{testData.user.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Key className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Login: {testData.profile.loginMethod}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">
                  {testData.user.location?.city}, {testData.user.location?.region}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {testData.profile.phoneVerified ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-yellow-600" />
                )}
                <span className="text-sm">
                  Phone: {testData.profile.phoneVerified ? 'Verified' : 'Not verified'}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Groups */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Grupos ({testData.groups.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {adminGroups.length > 0 && (
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Admin ({adminGroups.length})</div>
                  {adminGroups.map(g => (
                    <div key={g.id} className="flex items-center gap-2 text-sm py-1">
                      <Crown className="w-3 h-3 text-yellow-600" />
                      {g.name}
                    </div>
                  ))}
                </div>
              )}
              {modGroups.length > 0 && (
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Moderator ({modGroups.length})</div>
                  {modGroups.map(g => (
                    <div key={g.id} className="flex items-center gap-2 text-sm py-1">
                      <Shield className="w-3 h-3 text-blue-600" />
                      {g.name}
                    </div>
                  ))}
                </div>
              )}
              {memberGroups.length > 0 && (
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Member ({memberGroups.length})</div>
                  {memberGroups.map(g => (
                    <div key={g.id} className="flex items-center gap-2 text-sm py-1">
                      <User className="w-3 h-3 text-gray-600" />
                      {g.name}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Listings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Listings ({testData.listings.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {testData.listings.map(listing => (
                <div key={listing.id} className="flex items-start gap-2 text-sm border-b pb-2">
                  <div className="flex-1">
                    <div className="font-medium">{listing.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {listing.type} • {listing.visibility}
                      {listing.price && ` • ${listing.price}`}
                    </div>
                  </div>
                  {listing.title.includes('DRAFT') && (
                    <Badge variant="outline" className="text-xs">Draft</Badge>
                  )}
                  {listing.title.includes('PAUSED') && (
                    <Badge variant="outline" className="text-xs">Paused</Badge>
                  )}
                  {listing.title.includes('PENDING') && (
                    <Badge variant="outline" className="text-xs">Pending</Badge>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Organizations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Organizations ({testData.profile.organizations.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {testData.profile.organizations.length > 0 ? (
                <div className="space-y-2">
                  {testData.profile.organizations.map(org => (
                    <div key={org.id} className="flex items-start gap-2 text-sm">
                      <Building2 className="w-4 h-4 text-muted-foreground mt-0.5" />
                      <div>
                        <div className="font-medium">{org.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {org.type} • {org.role}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-muted-foreground py-4 text-center">
                  No organizations
                  {testData.user.accountType === 'individual' && (
                    <div className="text-xs mt-1">(Individual accounts cannot create orgs)</div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Feature Access */}
        <Card>
          <CardHeader>
            <CardTitle>Feature Access Matrix</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4">Feature</th>
                    <th className="text-center py-2 px-4">Available</th>
                    <th className="text-left py-2 px-4">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 px-4">AI Suggestions</td>
                    <td className="text-center py-2 px-4">
                      <CheckCircle className="w-4 h-4 text-green-600 inline" />
                    </td>
                    <td className="py-2 px-4 text-muted-foreground">Available for all plans</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">AI Auto-Analyze</td>
                    <td className="text-center py-2 px-4">
                      {testData.user.plan !== 'free' ? (
                        <CheckCircle className="w-4 h-4 text-green-600 inline" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-gray-400 inline" />
                      )}
                    </td>
                    <td className="py-2 px-4 text-muted-foreground">Plus & Pro only</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">Organizations</td>
                    <td className="text-center py-2 px-4">
                      {testData.user.plan !== 'free' && testData.user.accountType === 'store' ? (
                        <CheckCircle className="w-4 h-4 text-green-600 inline" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-gray-400 inline" />
                      )}
                    </td>
                    <td className="py-2 px-4 text-muted-foreground">
                      {testData.user.accountType === 'individual' 
                        ? 'Individual accounts cannot create orgs'
                        : 'Plus & Pro + Business account'}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">Bulk Upload</td>
                    <td className="text-center py-2 px-4">
                      {testData.user.plan === 'pro' ? (
                        <CheckCircle className="w-4 h-4 text-green-600 inline" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-gray-400 inline" />
                      )}
                    </td>
                    <td className="py-2 px-4 text-muted-foreground">Pro only</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4">Featured Listings</td>
                    <td className="text-center py-2 px-4">
                      {testData.user.plan === 'pro' ? (
                        <CheckCircle className="w-4 h-4 text-green-600 inline" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-gray-400 inline" />
                      )}
                    </td>
                    <td className="py-2 px-4 text-muted-foreground">Pro only</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Testing Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-2">
            <Button
              onClick={() => logUserSummary(selectedUser)}
              variant="outline"
            >
              Console Log Summary
            </Button>
            <Button
              onClick={() => compareUsers()}
              variant="outline"
            >
              Compare All Users
            </Button>
            <Button
              onClick={() => {
                console.log('Full Test Data:', testData);
              }}
              variant="outline"
            >
              Log Full Data
            </Button>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">💡 Cómo usar</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-blue-800 space-y-2">
            <p>1. Selecciona un usuario arriba para ver sus datos completos</p>
            <p>2. Para cambiar el usuario actual en la app, edita <code className="bg-blue-100 px-1 py-0.5 rounded">/data/currentUser.ts</code></p>
            <p>3. Cambia: <code className="bg-blue-100 px-1 py-0.5 rounded">mockCurrentUser = mockUserAna</code> (o Carlos/Maria)</p>
            <p>4. Los cambios se reflejan en toda la aplicación (grupos, listings, permisos, etc.)</p>
            <p>5. Usa los botones de testing para ver datos en la consola</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default MockUserTesting;