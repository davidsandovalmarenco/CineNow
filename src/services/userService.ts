import { User, updateProfile } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import { NotificationSettings, PaymentMethod, UserData } from './types';

const COLLECTION_NAME = 'users';
const DEFAULT_NOTIFICATION_SETTINGS: NotificationSettings = {
  reservationUpdates: true,
  movieReminders: true,
  promotions: true,
  emailNotifications: false,
};

export const userService = {
  async createUser(userId: string, data: Omit<UserData, 'createdAt' | 'id'>): Promise<void> {
    const userRef = doc(db, COLLECTION_NAME, userId);
    await setDoc(userRef, {
      ...data,
      notificationSettings: data.notificationSettings || DEFAULT_NOTIFICATION_SETTINGS,
      paymentMethods: data.paymentMethods || [],
      createdAt: serverTimestamp(),
    });
  },

  async getUser(userId: string): Promise<UserData | null> {
    const userRef = doc(db, COLLECTION_NAME, userId);
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      return { id: snap.id, ...snap.data() } as UserData;
    }
    return null;
  },

  async updateUser(userId: string, data: Partial<UserData>): Promise<void> {
    const userRef = doc(db, COLLECTION_NAME, userId);
    await setDoc(userRef, data as any, { merge: true });
  },

  async updateUserProfile(authUser: User, data: Pick<UserData, 'fullName' | 'phone' | 'photoURL'>): Promise<void> {
    await updateProfile(authUser, {
      displayName: data.fullName,
      photoURL: data.photoURL || null,
    });

    await this.updateUser(authUser.uid, {
      fullName: data.fullName,
      phone: data.phone,
      photoURL: data.photoURL,
    });
  },

  async getNotificationSettings(userId: string): Promise<NotificationSettings> {
    const userData = await this.getUser(userId);
    return userData?.notificationSettings || DEFAULT_NOTIFICATION_SETTINGS;
  },

  async updateNotificationSettings(userId: string, settings: NotificationSettings): Promise<void> {
    await this.updateUser(userId, { notificationSettings: settings });
  },

  async getPaymentMethods(userId: string): Promise<PaymentMethod[]> {
    const userData = await this.getUser(userId);
    return userData?.paymentMethods || [];
  },

  async addPaymentMethod(userId: string, method: Omit<PaymentMethod, 'id' | 'createdAt'>): Promise<PaymentMethod[]> {
    const methods = await this.getPaymentMethods(userId);
    const newMethod: PaymentMethod = {
      ...method,
      id: `${Date.now()}`,
      isDefault: methods.length === 0 || method.isDefault,
      createdAt: new Date(),
    };

    const nextMethods = [
      ...methods.map((item) => ({ ...item, isDefault: newMethod.isDefault ? false : item.isDefault })),
      newMethod,
    ];

    await this.updateUser(userId, { paymentMethods: nextMethods });
    return nextMethods;
  },

  async setDefaultPaymentMethod(userId: string, methodId: string): Promise<PaymentMethod[]> {
    const methods = await this.getPaymentMethods(userId);
    const nextMethods = methods.map((method) => ({
      ...method,
      isDefault: method.id === methodId,
    }));

    await this.updateUser(userId, { paymentMethods: nextMethods });
    return nextMethods;
  },

  async deletePaymentMethod(userId: string, methodId: string): Promise<PaymentMethod[]> {
    const methods = await this.getPaymentMethods(userId);
    const filtered = methods.filter((method) => method.id !== methodId);
    const hasDefault = filtered.some((method) => method.isDefault);
    const nextMethods = filtered.map((method, index) => ({
      ...method,
      isDefault: hasDefault ? method.isDefault : index === 0,
    }));

    await this.updateUser(userId, { paymentMethods: nextMethods });
    return nextMethods;
  },
};
