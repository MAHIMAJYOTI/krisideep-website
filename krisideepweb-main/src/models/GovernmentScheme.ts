export interface GovernmentScheme {
  id: string;
  schemeName: string;
  schemeNameHindi: string;
  description: string;
  descriptionHindi: string;
  category: string; // subsidy, loan, insurance, welfare
  eligibilityCriteria: string;
  eligibilityCriteriaHindi: string;
  maxBenefit: number;
  benefitType: string; // amount, percentage, fixed
  requiredDocuments: string[];
  requiredDocumentsHindi: string[];
  applicationProcess: string;
  applicationProcessHindi: string;
  contactInfo: string;
  startDate: Date;
  endDate?: Date;
  isActive: boolean;
  state: string;
  stateHindi: string;
}

export interface SubsidyApplication {
  id: string;
  schemeId: string;
  farmerName: string;
  farmerId: string;
  mobileNumber: string;
  applicationData: Record<string, any>;
  status: string; // submitted, under_review, approved, rejected, disbursed
  submissionDate: Date;
  approvalDate?: Date;
  disbursalDate?: Date;
  approvedAmount?: number;
  rejectionReason?: string;
  rejectionReasonHindi?: string;
  uploadedDocuments: string[];
}

export interface EligibilityResult {
  schemeId: string;
  isEligible: boolean;
  eligibilityScore: number; // 0-100
  eligibleCriteria: string[];
  ineligibleCriteria: string[];
  eligibleCriteriaHindi: string[];
  ineligibleCriteriaHindi: string[];
  estimatedBenefit: number;
  recommendations: string[];
  recommendationsHindi: string[];
}

export interface SchemeNotification {
  id: string;
  title: string;
  titleHindi: string;
  message: string;
  messageHindi: string;
  type: string; // new_scheme, deadline_reminder, status_update, general
  schemeId?: string;
  createdAt: Date;
  expiryDate?: Date;
  isRead: boolean;
  isImportant: boolean;
}

export interface GovernmentSchemeJson {
  id: string;
  schemeName: string;
  schemeNameHindi: string;
  description: string;
  descriptionHindi: string;
  category: string;
  eligibilityCriteria: string;
  eligibilityCriteriaHindi: string;
  maxBenefit: number;
  benefitType: string;
  requiredDocuments: string[];
  requiredDocumentsHindi: string[];
  applicationProcess: string;
  applicationProcessHindi: string;
  contactInfo: string;
  startDate: string;
  endDate?: string;
  isActive: boolean;
  state: string;
  stateHindi: string;
}

export interface SubsidyApplicationJson {
  id: string;
  schemeId: string;
  farmerName: string;
  farmerId: string;
  mobileNumber: string;
  applicationData: Record<string, any>;
  status: string;
  submissionDate: string;
  approvalDate?: string;
  disbursalDate?: string;
  approvedAmount?: number;
  rejectionReason?: string;
  rejectionReasonHindi?: string;
  uploadedDocuments: string[];
}

export interface EligibilityResultJson {
  schemeId: string;
  isEligible: boolean;
  eligibilityScore: number;
  eligibleCriteria: string[];
  ineligibleCriteria: string[];
  eligibleCriteriaHindi: string[];
  ineligibleCriteriaHindi: string[];
  estimatedBenefit: number;
  recommendations: string[];
  recommendationsHindi: string[];
}

export interface SchemeNotificationJson {
  id: string;
  title: string;
  titleHindi: string;
  message: string;
  messageHindi: string;
  type: string;
  schemeId?: string;
  createdAt: string;
  expiryDate?: string;
  isRead: boolean;
  isImportant: boolean;
}

export const governmentSchemeFromJson = (json: GovernmentSchemeJson): GovernmentScheme => ({
  id: json.id,
  schemeName: json.schemeName,
  schemeNameHindi: json.schemeNameHindi,
  description: json.description,
  descriptionHindi: json.descriptionHindi,
  category: json.category,
  eligibilityCriteria: json.eligibilityCriteria,
  eligibilityCriteriaHindi: json.eligibilityCriteriaHindi,
  maxBenefit: json.maxBenefit,
  benefitType: json.benefitType,
  requiredDocuments: json.requiredDocuments,
  requiredDocumentsHindi: json.requiredDocumentsHindi,
  applicationProcess: json.applicationProcess,
  applicationProcessHindi: json.applicationProcessHindi,
  contactInfo: json.contactInfo,
  startDate: new Date(json.startDate),
  endDate: json.endDate ? new Date(json.endDate) : undefined,
  isActive: json.isActive ?? true,
  state: json.state,
  stateHindi: json.stateHindi,
});

export const subsidyApplicationFromJson = (json: SubsidyApplicationJson): SubsidyApplication => ({
  id: json.id,
  schemeId: json.schemeId,
  farmerName: json.farmerName,
  farmerId: json.farmerId,
  mobileNumber: json.mobileNumber,
  applicationData: json.applicationData,
  status: json.status,
  submissionDate: new Date(json.submissionDate),
  approvalDate: json.approvalDate ? new Date(json.approvalDate) : undefined,
  disbursalDate: json.disbursalDate ? new Date(json.disbursalDate) : undefined,
  approvedAmount: json.approvedAmount,
  rejectionReason: json.rejectionReason,
  rejectionReasonHindi: json.rejectionReasonHindi,
  uploadedDocuments: json.uploadedDocuments || [],
});

export const eligibilityResultFromJson = (json: EligibilityResultJson): EligibilityResult => ({
  schemeId: json.schemeId,
  isEligible: json.isEligible,
  eligibilityScore: json.eligibilityScore,
  eligibleCriteria: json.eligibleCriteria,
  ineligibleCriteria: json.ineligibleCriteria,
  eligibleCriteriaHindi: json.eligibleCriteriaHindi,
  ineligibleCriteriaHindi: json.ineligibleCriteriaHindi,
  estimatedBenefit: json.estimatedBenefit,
  recommendations: json.recommendations,
  recommendationsHindi: json.recommendationsHindi,
});

export const schemeNotificationFromJson = (json: SchemeNotificationJson): SchemeNotification => ({
  id: json.id,
  title: json.title,
  titleHindi: json.titleHindi,
  message: json.message,
  messageHindi: json.messageHindi,
  type: json.type,
  schemeId: json.schemeId,
  createdAt: new Date(json.createdAt),
  expiryDate: json.expiryDate ? new Date(json.expiryDate) : undefined,
  isRead: json.isRead ?? false,
  isImportant: json.isImportant ?? false,
});

export const governmentSchemeToJson = (scheme: GovernmentScheme): GovernmentSchemeJson => ({
  id: scheme.id,
  schemeName: scheme.schemeName,
  schemeNameHindi: scheme.schemeNameHindi,
  description: scheme.description,
  descriptionHindi: scheme.descriptionHindi,
  category: scheme.category,
  eligibilityCriteria: scheme.eligibilityCriteria,
  eligibilityCriteriaHindi: scheme.eligibilityCriteriaHindi,
  maxBenefit: scheme.maxBenefit,
  benefitType: scheme.benefitType,
  requiredDocuments: scheme.requiredDocuments,
  requiredDocumentsHindi: scheme.requiredDocumentsHindi,
  applicationProcess: scheme.applicationProcess,
  applicationProcessHindi: scheme.applicationProcessHindi,
  contactInfo: scheme.contactInfo,
  startDate: scheme.startDate.toISOString(),
  endDate: scheme.endDate?.toISOString(),
  isActive: scheme.isActive,
  state: scheme.state,
  stateHindi: scheme.stateHindi,
});

export const subsidyApplicationToJson = (application: SubsidyApplication): SubsidyApplicationJson => ({
  id: application.id,
  schemeId: application.schemeId,
  farmerName: application.farmerName,
  farmerId: application.farmerId,
  mobileNumber: application.mobileNumber,
  applicationData: application.applicationData,
  status: application.status,
  submissionDate: application.submissionDate.toISOString(),
  approvalDate: application.approvalDate?.toISOString(),
  disbursalDate: application.disbursalDate?.toISOString(),
  approvedAmount: application.approvedAmount,
  rejectionReason: application.rejectionReason,
  rejectionReasonHindi: application.rejectionReasonHindi,
  uploadedDocuments: application.uploadedDocuments,
});

export const eligibilityResultToJson = (result: EligibilityResult): EligibilityResultJson => ({
  schemeId: result.schemeId,
  isEligible: result.isEligible,
  eligibilityScore: result.eligibilityScore,
  eligibleCriteria: result.eligibleCriteria,
  ineligibleCriteria: result.ineligibleCriteria,
  eligibleCriteriaHindi: result.eligibleCriteriaHindi,
  ineligibleCriteriaHindi: result.ineligibleCriteriaHindi,
  estimatedBenefit: result.estimatedBenefit,
  recommendations: result.recommendations,
  recommendationsHindi: result.recommendationsHindi,
});

export const schemeNotificationToJson = (notification: SchemeNotification): SchemeNotificationJson => ({
  id: notification.id,
  title: notification.title,
  titleHindi: notification.titleHindi,
  message: notification.message,
  messageHindi: notification.messageHindi,
  type: notification.type,
  schemeId: notification.schemeId,
  createdAt: notification.createdAt.toISOString(),
  expiryDate: notification.expiryDate?.toISOString(),
  isRead: notification.isRead,
  isImportant: notification.isImportant,
});
