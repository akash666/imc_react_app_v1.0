
class ServiceCallsConstantsClass
{
    // static int numberOfChildEvents = 0;
    static  eventSessionInfoUrl = "/command?action=eventInfo&sessionId=";

    //command? action = eventInfo & sessionId = 11573211904595_22005_SBIP3A6255C1_13-10-2021-07-54-04

    static  eventChildEventsInfoUrl = "/childEvents?sessionId=";//&userLevel=Team%20Member";

    // static  eventRecvAckUrl = "/audit?action=received&data=";

    static  eventRecvAckUrl = "/audit?";

    static  eventReviewAckUrl = "/audit?";

    // static  eventReviewAckUrl = "/audit?action=review&data=";

    // static  eventPassAckUrl = "/audit?action=eventpass&data=";

    static  eventPassAckUrl = "/audit?";

    // static  eventTerminateUrl= "/terminateEvent?action=terminate&data=";

    static  eventTerminateUrl = "/terminateEvent?";

    // static  eventEscalateUrl= "/escalateEvent?action=escalate&data=";

    static  eventEscalateUrl = "/escalateEvent?";

     //servicecalls for event live and playback
    static  eventInitUrl = "/playback?cameraId=";

    static  eventPlayUrl = "/playback?cameraId=";

    static  liveInitUrl = "/playback?cameraId=";

    static  livePlayUrl = "/playback?cameraId=";

    static  archiveInitUrl = "/jpegPlay?cameraId=";

    static  archivePlayUrl = "/jpegPlay?cameraId=";

    //http://vs1.iviscloud.net:7888/jpegPlay?cameraId=IVIS5750C1&time=2018-02-21-17-54-01&sessionId=1123&motionEnabled=false&action=init
    //http://vs1.iviscloud.net:7888/jpegPlay?cameraId=IVIS5750C1&time=2018-02-21-17-54-01&sessionId=1123&motionEnabled=false&action=play

     //this url used to get tags from console based on type (escalation,endofescalation,endofshift)
    static  TagsBasedOnTypeUrl = "/ivigil-console/ClientService?event=tags&typeId=";
    static  FacilityTagsUrl = "/ivigil-console/taggroupjson.jsp?action=facility";

    static  TagsBasedOnTypeSiteManagerUrl = "/ivigil-crm/ClientService?event=tags&typeId=";
    static  FacilityTagsSiteManagerUrl = "/ivigil-crm/taggroupjson.jsp?action=facility";

    static  SiteInfoUrl = "/ivigil-crm/SiteInfoClient?action=siteInfo&potentialId=";
    static  EscMatrixIncidentTypeUrl = "/ivigil-crm/getesclmatrixbytype.jsp?potentialId=";
    static  EsclMatrixUrl = "/ivigil-crm/getesclmatrix.jsp?potentialId=";
    static  TagsBasedOnTypeUrl_Sitemanager = "/ivigil-crm/ClientService?event=tags&typeId=";
    static  FacilityTagsUrl_Sitemanager = "/ivigil-crm/taggroupjson.jsp?action=facility";

    static  PrevEscUrl = "/imp-event-repo/DashboardServlet?action=previousEscalations&siteId=";
    static  UserAuditUrl = ":55555/loginAuditLog";
    static  UserFeedbackUrl = ":55555/feedbackLog";

    static  TicketInfoUrl = "/ivigil-crm/rest/client/tktlist/";
    


    static  EndPointsInfoUrl = "/ivigil-crm/ServerConfigurationServlet?action=serverInfo";
    static  MonitoringInfoUrl = "/ivigil-crm/MonitoringApp?action=monitoringconfig";
    static  UserAuthenticationUrl = "/ivis-user-management/User?action=login&userId=";
    static  UserResponsibilitiesUrl = "/ivigil-crm/MonitoringApp?action=profile&roleId=";
    static  UserAllocatedQueuesUrl = "/ivigil-crm/MonitoringApp?userId=";
    static  UserAssignedLevelUrl = "/ivigil-crm/MonitoringApp?userId=";

    static  GetProjectWiseSitesUrl = "/ivigil-crm//DataAPI?action=sitesByFacility&facility=";
    static  GetProjectsUrl = "/ivigil-crm//DataAPI?action=lookupall&lookUpType=Facility";

    static  AlarmServerUrl = "/Action?deviceId=";
    static  workspaceUrl = "/ivigil-workspace/services/IvigilWorkspaceService";
    static  AudioRegistrationUrl = "/ivigil-crm/SiteInfoClient?action=getRegNo&systemName=";

    static  SiteInfoFromSiteServerUrl = "/siteserver/getSiteAnalytics.jsp?potentialId=";


    //"http://kernel.iviscloud.net:8182/ivis-kernel-server/Dignostics?action=diagnostics&type=OpenVaultLatchDoor&deviceId=IVISTEST"
    static  VaultOpenKernelServerUrl = "/ivis-kernel-server/Dignostics?action=diagnostics&type=OpenVaultLatchDoor&deviceId=";
    //"http://kernel.iviscloud.net:8182/ivis-kernel-server/Dignostics?action=diagnostics&type=OpenVaultDoorAfterSaftyCheckOverrideKeyPad&deviceId=IVISTEST"
    static  VaultOpenOverrideKeyPadKernelServerUrl = "/ivis-kernel-server/Dignostics?action=diagnostics&type=OpenVaultDoorAfterSaftyCheckOverrideKeyPad&deviceId=";
    //"http://kernel.iviscloud.net:8182/ivis-kernel-server/Dignostics?action=diagnostics&type=CloseVaultLatchDoor&deviceId=IVISTEST"
    static  VaultCloseKernelServerUrl = "/ivis-kernel-server/Dignostics?action=diagnostics&type=CloseVaultLatchDoor&deviceId=";
    //"http://kernel.iviscloud.net:8182/ivis-kernel-server/Dignostics?action=diagnostics&type=StatusVaultLatchDoor&deviceId=IVISTEST"
    static  VaultStatusKernelServerUrl = "/ivis-kernel-server/Dignostics?action=diagnostics&type=StatusVaultLatchDoor&deviceId=";
    // "http://kernel.iviscloud.net:8182/ivis-kernel-server/Dignostics?action=diagnostics&type=OpenVaultDoorOverrideKeypadAuth&deviceId=IVISTEST"
    static  VaultOverrideOpenKernelServerUrl = "/ivis-kernel-server/Dignostics?action=diagnostics&type=OpenVaultDoorOverrideKeypadAuth&deviceId=";
    //"http://kernel.iviscloud.net:8182/ivis-kernel-server/Dignostics?action=diagnostics&type=ResetMainBMDoor&deviceId=IVISTEST"
    static  ResetMainBMDoorKernelServerUrl = "/ivis-kernel-server/Dignostics?action=diagnostics&type=ResetMainBMDoor&deviceId=";
    

    static  VaultOpenAudioKernelServerUrl = "/ivis-kernel-server/audio?fileName=openingVaultDoor.mp3&deviceId=";
    static  VaultCloseAudioKernelServerUrl = "/ivis-kernel-server/audio?fileName=closingVaultDoor.mp3&deviceId=";
    static  VaultCloseAudio5MinsKernelServerUrl = "/ivis-kernel-server/audio?fileName=fiveMinutesUpClosingVault.mp3&deviceId=";

    //http://kernel.iviscloud.net:8182/ivis-kernel-server/audio?fileName=vaultDoorOpeningShortly.mp3&deviceId=IVISTEST
    static  AudioFilePlayKernelServerUrl = "/ivis-kernel-server/audio?fileName=";


    static  EventTerminateKernelServerUrl = "/ivis-kernel-server/Dignostics?action=diagnostics&type=TerminateIIFLEvent&deviceId=";

    //  http://kernel.iviscloud.net:8182/ivis-kernel-server/Dignostics?action=diagnostics&type=TerminateIIFLEvent&deviceId=SBIP3A1703

    //http://kernel.iviscloud.net:8182//ivis-kernel-server/Dignostics?action=diagnostics&type=OpenVaultLatchDoor&deviceId=SBIP3A1703

    static LogstashUrl = "/client_slot_usage";

 }

 module.exports = {ServiceCallsConstantsClass};