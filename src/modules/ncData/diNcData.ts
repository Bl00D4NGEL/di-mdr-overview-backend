export interface diNcData {
    NCSince: number;
    NCReasons: [{
        reason: string;
        causing_unit: 1;
        drain_rate: 1;
    }];
}
