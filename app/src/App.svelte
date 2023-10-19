<script lang="ts">
  // GLOBAL VALUES
  export let name: string
  export let locale: string
  export let version:string

  // IMPORT VALUES
  import MonthTable from "./MonthTable.svelte"
  import WeekTable from "./WeekTable.svelte";
  import { strings } from "./strings"

  // LOCAL FUNCTIONS
  const getWeekNumber = (date:Date) => 
  {
    date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0)
    date.setDate(date.getDate() + 4 - (date.getDay()||7))
    const yearStart = new Date(date.getFullYear(),0,1, 0, 0, 0, 0)
    const weekNo = Math.ceil(( ( (date.getTime() - yearStart.getTime()) / 86400000) + 1)/7)
    return weekNo
  }

  const getDateRangeOfWeek = (weekNo:number, year:number) => 
  {
    const date = new Date(year, 0, 1)
    let first = new Date(year, 0, 1)
    let last = new Date(year, 0, 1)
    first.setDate(date.getDate() + (7 * (weekNo-1)) + 1)
    last.setDate(date.getDate() + (7 * (weekNo-1)) + 7)
    return [first, last]
  }

  const shiftDate = (date:Date, days:number = 0, months:number = 0, years:number = 0) => 
  {
    const day = date.getDate() + days
    const mon = date.getMonth() + months
    const year = date.getFullYear() + years
    return new Date(year, mon, day, 0, 0, 0, 0)
  }

  // LOCAL VALUES
  const d = new Date()
  const currentDate = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0)
  const currentWeekNumber = getWeekNumber(currentDate)
  const currentWeekRange = getDateRangeOfWeek(currentWeekNumber, currentDate.getFullYear())
  
  let display = {
    date: currentDate,
    week: {
      from: currentWeekRange[0], 
      to: currentWeekRange[1],
    }, 
    month: currentDate.getMonth(),
    year: currentDate.getFullYear(),
  }
    
  let periodDisplay:string = 'week'


  // HANDLERS
  const handleDisplaySwitch = (event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) => 
  {
    periodDisplay = event.currentTarget.dataset['display']
  }

  const handleResetDisplayDate = (event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) => 
  {
    display.date = currentDate
    display.week.from = currentWeekRange[0]
    display.week.to = currentWeekRange[1]
    display.month = display.date.getMonth()
    display.year = display.date.getFullYear()
  }

  function handleDisplayPrevOne(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement })
  {
    switch (periodDisplay) {
      case 'week':
        const days = -1
        display.date = shiftDate(display.date, days)
        display.week.from = shiftDate(display.week.from, days)
        display.week.to = shiftDate(display.week.to, days)
        break
      
      case 'month':
        const months = -1
        display.date = shiftDate(display.date, 0, months)
        if (display.month > 0) {
          display.month -= 1
        } else {
          display.month = 11
          display.year -= 1
        }
        break
        
      case 'year':
        const years = -1
        display.date = shiftDate(display.date, 0, 0, years)
        display.year -= 1
        break

      default:
      display.date = currentDate
      display.week.from = currentWeekRange[0]
      display.week.to = currentWeekRange[1]
      display.month = display.date.getMonth()
      display.year = display.date.getFullYear()
    }
    console.log(display.date, currentDate)
  }

  function handleDisplayPrev(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement })
  {
    if ('week' === periodDisplay) {
      const days = -7
      display.date = shiftDate(display.date, days)
      display.week.from = shiftDate(display.week.from, days)
      display.week.to = shiftDate(display.week.to, days)
    } else if ('month' === periodDisplay) {
      const days = -365
      display.date = shiftDate(display.date, days)
      display.year -= 1
    }
  }

  function handleDisplayNextOne(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement })
  {
    switch (periodDisplay) {
      case 'week':
        const days = +1
        display.date = shiftDate(display.date, days)
        display.week.from = shiftDate(display.week.from, days)
        display.week.to = shiftDate(display.week.to, days)
        break
      
      case 'month':
        const months = +1
        display.date = shiftDate(display.date, 0, months)
        if (display.month < 11) {
          display.month += 1
        } else {
          display.month = 0
          display.year += 1
        }
        break
        
      case 'year':
        const years = +1
        display.date = shiftDate(display.date, 0, 0, years)
        display.year += 1
        break

      default:
      display.date = currentDate
      display.week.from = currentWeekRange[0]
      display.week.to = currentWeekRange[1]
      display.month = display.date.getMonth()
      display.year = display.date.getFullYear()
    }
    console.log(display.date, currentDate)
  }

  function handleDisplayNext(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement })
  {
    if ('week' === periodDisplay) {
      const days = +7
      display.date = shiftDate(display.date, days)
      display.week.from = shiftDate(display.week.from, days)
      display.week.to = shiftDate(display.week.to, days)
    } else if ('month' === periodDisplay) {
      display.year += 1
    }
  }
</script>

<main data-locale="{locale}" data-version="{version}">
  <section class="pt-3 text-center container">
    <div class="row py-lg-3">
      <div class="col-lg-6 col-md-8 mx-auto">
        <h1>{name}</h1>
      </div>
    </div>
  </section>

  <div class="pt-4 bg-white">
    <div class="album bg-body-tertiary border border-tertiary py-4">
      <div class="container">
        <div class="row">
          <div class="col">
            <div class="btn-toolbar" role="toolbar" aria-label="Date area select buttons">
              <div class="col-4 text-start">
                <div class="btn-group btn-group-sm" role="group">
                  <button type="button" class="btn btn-primary dropdown-toggle" disabled data-bs-toggle="dropdown" aria-expanded="false">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar2-check" viewBox="0 0 16 16">
                      <path d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                      <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z"/>
                      <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z"/>
                    </svg> 
                  </button>
                  <ul class="dropdown-menu dropdown-menu-start">
                    <li><a class="dropdown-item" href="#">Alle</a></li>
                    <li><a class="dropdown-item" href="#">Ferien & Feiertage</a></li>
                    <li><a class="dropdown-item" href="#">Schulveranstaltungen</a></li>
                    <li><a class="dropdown-item" href="#">Gremien & AGs</a></li>
                    <li><a class="dropdown-item" href="#">Schüler*innen</a></li>
                  </ul>
                </div>

                <div class="btn-group btn-group-sm" role="group" aria-label="Display button group with calendar dropdown">
                  <button type="button" on:click={handleDisplaySwitch} data-display="week" class="btn btn-outline-primary" class:active={'week' === periodDisplay}>WOCHE</button>
                  <button type="button" on:click={handleDisplaySwitch} data-display="month" class="btn btn-outline-primary" class:active={ 'month' === periodDisplay}>MONAT</button>
                  <button type="button" on:click={handleDisplaySwitch} data-display="year" class="btn btn-outline-primary" class:active={ 'year' === periodDisplay}>JAHR</button>
                  <button type="button" on:click={handleDisplaySwitch} data-display="list" class="btn btn-outline-primary" class:active={ 'list' === periodDisplay}>LISTE</button>
                </div>
              </div>

              <div class="col-4 text-center">
                <div class="date-display my-2">
                  {#if 'week' === periodDisplay}
                  <h6><span class="d-none d-md-inline">Woche {getWeekNumber(display.week.from)} vom </span>{display.week.from.getDate()}. {strings.mon.long[display.week.from.getMonth()]} - {display.week.to.getDate()}. {strings.mon.long[display.week.to.getMonth()]} {display.date.getFullYear()}</h6>
                  {:else if 'month' === periodDisplay}
                  <h6>Monat {strings.mon.long[display.month]} {display.year}</h6>
                  {:else if 'year' === periodDisplay}
                  <h6>Jahr {display.date.getFullYear()}</h6>
                  {:else}
                  <h6>Liste der Termine</h6>
                  {/if}
                </div>
              </div>

              <div class="col-4 text-end">
                <div class="btn-group btn-group-sm " role="group" aria-label="Date area">
                  <button type="button" on:click={handleDisplayPrev} class="btn btn-outline-primary pb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill="currentColor">
                      <!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                      <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z"/>
                    </svg>
                  </button>
                  <button type="button" on:click={handleDisplayPrevOne} class="btn btn-outline-primary pb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512" fill="currentColor">
                      <!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                      <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
                    </svg>
                  </button>
                  <button type="button" on:click={handleResetDisplayDate} class="btn btn-outline-primary pb-2" class:active={display.date.getTime() == currentDate.getTime()}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill="currentColor">
                      <!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                      <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256-96a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"/>
                    </svg>
                  </button>
                  <button type="button" on:click={handleDisplayNextOne} class="btn btn-outline-primary pb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512" fill="currentColor">
                      <!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                      <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"/>
                    </svg>              
                  </button>
                  <button type="button" on:click={handleDisplayNext} class="btn btn-outline-primary pb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill="currentColor">
                      <!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                      <path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"/>
                    </svg>
                  </button>
                </div>
                <div class="btn-group btn-group-sm" role="group" aria-label="Search area">
                  <button type="button" on:click={handleSearch} disabled class="btn btn-primary pb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill="currentColor">
                      <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                      <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
                    </svg>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  {#if 'week' === periodDisplay}
    {#key display}
    <WeekTable from={display.week.from} week={getWeekNumber(display.week.from)} />
    {/key}
  {:else if 'month' === periodDisplay}
    {#key display}
    <MonthTable month={display.month} year={display.year} />
    {/key}
  {/if}
</main>

<style>

</style>
