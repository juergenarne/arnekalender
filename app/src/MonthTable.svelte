<script lang="ts">
    import MonthTableCell from './MonthTableCell.svelte';
    import { strings } from './strings';
    
    export let month:number
    export let year:number

    let dateRange = {
        fst: new Date(Date.UTC(year, month, 1)),
        lst: new Date(Date.UTC(year, month + 1, 0))
    }

    if (dateRange.fst.getDay() > 1) {
        dateRange.fst.setDate(dateRange.fst.getDate() - dateRange.fst.getDay() + 1)
    }
    
    if (dateRange.lst.getDay() < 7) {
        dateRange.lst.setDate(dateRange.lst.getDate() - dateRange.lst.getDay() + 7)
    }

    let displayDays = []
    let k = 0
    const l = (dateRange.lst.getTime() - dateRange.fst.getTime()) / 1000 / 3600 / 24

    while (k <= l) {
        const d = new Date(dateRange.fst)
        let day = new Date(dateRange.fst)
        day.setDate(d.getDate() + k)
        displayDays.push(day)
        k++
    }
</script>

<div class="album bg-body-white month-table" data-month="{month}" data-year="{year}">
    <div class="row row-cols-7 mx-0">
        {#each Array(7) as _, i}
        <div class="col py-2 month-table-header">
            {strings.day.short[i + 1]}
        </div>
        {/each}
    </div>

    <div class="row row-cols-7 mx-0">
        {#each displayDays as day}
            {#if day < new Date(year, month, 1) || day > new Date(year, month + 1, 1)}
                <MonthTableCell class="col month-table-cell date-off" data-date="{day.getFullYear()}-{day.getMonth()}-{day.getDate()}" day={day} />
            {:else}
                <MonthTableCell class="col month-table-cell" data-date="{day.getFullYear()}-{day.getMonth()}-{day.getDate()}" day={day} />
            {/if}
        {/each}
    </div>
</div>

<style>
</style>
