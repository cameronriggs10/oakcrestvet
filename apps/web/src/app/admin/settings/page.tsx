"use client";
import { useState } from "react";
import { Settings, MessageSquare, Bell, Clock, PawPrint, ToggleLeft, ToggleRight, Save } from "lucide-react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    clientMessaging: true,
    autoReminders: true,
    onlineBooking: true,
    allowRefillRequests: true,
    smsNotifications: false,
    pushNotifications: true,
    weekendHours: false,
  });

  const [saved, setSaved] = useState(false);

  const toggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const settingsList = [
    { key: "clientMessaging" as const, label: "Client Messaging", desc: "Allow clients to send messages to the clinic from their portal", icon: MessageSquare },
    { key: "onlineBooking" as const, label: "Online Booking", desc: "Allow clients to book appointments online", icon: Clock },
    { key: "allowRefillRequests" as const, label: "Refill Requests", desc: "Allow clients to request medication refills through the portal", icon: PawPrint },
    { key: "autoReminders" as const, label: "Auto Appointment Reminders", desc: "Send automatic reminders to clients before appointments", icon: Bell },
    { key: "smsNotifications" as const, label: "SMS Notifications", desc: "Send text message notifications for appointments and alerts", icon: MessageSquare },
    { key: "pushNotifications" as const, label: "Push Notifications", desc: "Send push notifications through the mobile app", icon: Bell },
    { key: "weekendHours" as const, label: "Weekend Walk-in Hours", desc: "Display Saturday walk-in hours (9 AM - 1 PM) on the website", icon: Clock },
  ];

  return (
    <>
      <div className="bg-white border-b border-sage-200 px-8 py-6">
        <h1 className="font-display text-2xl font-bold text-sage-900">Settings</h1>
        <p className="text-sm text-sage-500 mt-1">Configure clinic portal features and preferences</p>
      </div>

      <div className="p-8 max-w-2xl space-y-6">
        {/* Save Notification */}
        {saved && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-sm text-green-700 flex items-center gap-2">
            <Save className="w-4 h-4" /> Settings saved successfully!
          </div>
        )}

        {/* Settings List */}
        <div className="bg-white rounded-2xl border border-sage-100 divide-y divide-sage-50">
          {settingsList.map((s) => {
            const Icon = s.icon;
            const isOn = settings[s.key];
            return (
              <div key={s.key} className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isOn ? 'bg-primary-50 text-primary-600' : 'bg-sage-50 text-sage-400'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-sage-900">{s.label}</p>
                    <p className="text-xs text-sage-500 mt-0.5">{s.desc}</p>
                  </div>
                </div>
                <button onClick={() => toggle(s.key)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${isOn ? 'bg-primary-500' : 'bg-sage-200'}`}
                >
                  <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${isOn ? 'translate-x-6' : 'translate-x-0.5'}`} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Save Button */}
        <button onClick={handleSave} className="px-6 py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors">
          Save Settings
        </button>
      </div>
    </>
  );
}