import { ApexOptions } from 'apexcharts';
import { CustomTheme } from '../Theme/types';
import { darken } from '@material-ui/core';

type formatterFunction = (val: any) => any;

export const getGraphOptions = (type: string, id: string, categories: any,

    labelsFormatter: formatterFunction | undefined,
    dataFormatter: formatterFunction | undefined,
    toolTipFormatter: formatterFunction | undefined,
    tooltipClass: string | undefined,
    theme: CustomTheme,
    distributed?: boolean,
    colors?: any,
    hideDataLabels?: boolean,
    hideMarkers?: boolean,
    strokeWidth?: number,
    disableAnimations?: boolean
): ApexOptions => {

    if (distributed === undefined)
        distributed = true;
    return {
        chart: {
            id,
            foreColor: theme.palette.text.primary,
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            },
            animations: {
                enabled: !disableAnimations,
                dynamicAnimation: {
                    enabled: false
                }
            },

        },
        labels: categories,
        colors,
        grid: {
            borderColor: (theme.palette.type === 'dark' ? darken(theme.palette.divider, 0.7) : theme.palette.divider),
        },
        stroke: {
            curve: 'smooth',
            width: strokeWidth ? strokeWidth : 5,
            // colors: ((type === 'pie' || type === 'donut') && theme.palette.type === 'dark') ? [darken(theme.palette.divider, 0.7)] : undefined,
            colors: undefined,
        },
        xaxis: {
            categories,
            labels: {
                formatter: labelsFormatter
            },
        },
        tooltip: {
            cssClass: tooltipClass,
            y: {
                formatter: toolTipFormatter
            },
        },
        states: {
            hover: {
                filter: {
                    type: 'none',
                }
            }
        },
        plotOptions: {
            bar: {
                distributed,
            },

            pie: {
                customScale: 0.8,
                donut: {
                    size: '55%'
                },
            }

        },
        dataLabels: {
            enabled: !hideDataLabels,
            offsetY: -10,
            distributed,
            formatter: dataFormatter,
        },

        markers: hideMarkers ? {} : {
            size: 5,
            hover: {
                size: 5,
            }
        },
        legend: {
            show: false,
        },
    }
}