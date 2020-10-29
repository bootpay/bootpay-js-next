import { BootpaySingleton } from './common/singleton'
import { isBlank, isPresent } from './common/support'

export interface BootpayItemData {
    cat1?: string
    cat2?: string
    cat3?: string
    itemImg?: string
    itemName?: string
    qty?: number
    unique: string
    price: number
}

interface EnvironmentUrlData {
    development: string
    stage: string
    production: string

    [key: string]: string
}

interface UrlData {
    analyticsUrl: EnvironmentUrlData
}

const BOOTPAY_URL: UrlData = {
    analyticsUrl: {
        development: 'https://dev-analytics.bootpay.co.kr',
        stage: 'https://stage-analytics.bootpay.co.kr',
        production: 'https://analytics.bootpay.co.kr'
    }
}

class BootpayConfig extends BootpaySingleton {
    applicationId?: string
    mode: string

    constructor() {
        super()
        // default는 production이다
        this.mode = 'production'
        this.applicationId = undefined
    }

    setMode(mode: string) {
        this.mode = mode
    }

    currentApplicationId(applicationId: any = undefined) {
        if (isPresent(applicationId)) {
            this.applicationId = applicationId
        }
        if (isBlank(this.applicationId)) {
            let tag = document.querySelector('meta[name="bootpay-application-id"]')
            if (tag !== null && tag !== undefined) {
                this.applicationId = String(tag.getAttribute('content'))
            }
        }
        return this.applicationId
    }

    analyticsUrl(uri: string) {
        return [BOOTPAY_URL.analyticsUrl[this.mode], uri].join('/')
    }

}

export const Config = BootpayConfig.currentInstance<BootpayConfig>()