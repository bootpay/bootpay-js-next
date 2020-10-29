import { Resource } from './common/resource'
import { isBlank, isPresent, objectKeyToUnderscore, presence } from './common/support'
import { BootpayItemData, Config } from './config'
import * as pack from '../../package.json'
import { BootpayStorage } from './storage'
import { Logger } from './common/logger'

export interface CommonAnalyticsData {
    applicationId?: string
    page_type?: string
    url?: string
    items?: BootpayItemData
}

export interface LoginData {
    applicationId?: string
    id: string
    username?: string
    birth?: string
    phone?: string
    email?: string
    gender?: number
    area?: string
}

const sendCommonAnalytics = (data: CommonAnalyticsData) => {
    if (!ignoreAnalyticsDomain()) {
        const applicationId: string = presence(data.applicationId, Config.currentApplicationId())
        try {
            Resource.$http.post(
                Config.analyticsUrl(`call?ver=${pack.version}`),
                {
                    application_id: applicationId,
                    uuid: BootpayStorage.currentUUID(),
                    time: BootpayStorage.time(),
                    url: isPresent(data.url) ? data.url : document.URL,
                    referer: isPresent(document.referrer) && document.referrer.search(new RegExp(window.location.hostname)) == -1 ? document.referrer : '',
                    sk: BootpayStorage.sk(),
                    user_id: isPresent(BootpayStorage.user()) ? BootpayStorage.user().id : undefined,
                    page_type: isPresent(data.page_type) ? data.page_type : undefined,
                    items: objectKeyToUnderscore(data.items)
                }
            )
        } catch (e) {
            Logger.warning(
                `${JSON.stringify(e)}`
            )
        }
    }
    return
}

export const startLoginSession = async (data: LoginData) => {
    if (isBlank(data)) {
        Logger.error('로그인 한 회원 정보를 입력해주세요.')
    }
    if (isBlank(data.id)) {
        Logger.error('로그인 한 회원 아이디 정보를 입력해주세요.')
    }
    const applicationId: string = presence(data.applicationId, Config.currentApplicationId())
    try {
        let response = await Resource.$http.post(
            Config.analyticsUrl(`login?ver=${pack.version}`),
            {
                application_id: applicationId,
                id: data.id,
                username: data.username,
                birth: data.birth,
                phone: data.phone,
                email: data.email,
                gender: data.gender,
                area: getAreaIndex(data.area)
            }
        )
        if (response.status === 200) {
            BootpayStorage.user(response.data)
        }
    } catch (e) {
        Logger.error(JSON.stringify(e))
    }
}

export const setAnalyticsData = (data: any) => {
    Object.keys(data).forEach((key) => {
        if (isPresent(data[key])) {
            switch (key) {
                case 'uuid':
                    BootpayStorage.setUUID(data[key])
                    break
                case 'sk':
                    BootpayStorage.sk(data[key])
                    break
                case 'sk_time':
                    BootpayStorage.skTime(data[key])
                    break
                case 'time':
                    BootpayStorage.time(data[key])
                    break
            }
        }
    })
}

const getAreaIndex = (area: any) => {
    let filtered: any = undefined
    if (isPresent(area)) {
        filtered = area.match(/서울|인천|대구|광주|부산|울산|경기|강원|충청북도|충북|충청남도|충남|전라북도|전북|전라남도|전남|경상북도|경북|경상남도|경남|제주|세종|대전/)
        filtered = isPresent(filtered) ? filtered[0] : undefined
    }
    return filtered
}

const ignoreAnalyticsDomain = () => {
    return isPresent(document.URL) &&
        document.URL.search(/bootpay.co.kr/) > -1 &&
        document.URL.search(/bootapi.com/) > -1
}

export const startTrace = (data: CommonAnalyticsData) => {
    // User 데이터를 초기화할지 결정한다
    BootpayStorage.expireUser()
    sendCommonAnalytics(data)
}