<script lang="ts">
  import { strings } from "./strings";
  import { settings } from "./settings"

  export let day: Date;
  const comp1 = new Date(day.getFullYear(), day.getMonth(), day.getDate());
  const today = new Date();
  const comp2 = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const display = {
    hours: settings.weekTab.display.hours, 
    min: settings.weekTab.display.min, 
    max: settings.weekTab.display.max
  }

  let className = "today";
  if (comp1 < comp2) {
    className = "past";
  }
  if (comp1 > comp2) {
    className = "future";
  }
  if (day.getDay() === 6) {
    className += ' weekend'
  }
  if (day.getDay() === 0) {
    className += ' weekend'
  }
  className += ' ' + strings.class[day.getDay()]
</script>

<div class="col">
  <div class="row row-cols-1 {className}" data-weekday="{day.getDay()}">
    <div class="col week-table-header">
      {strings.day.short[day.getDay()]}. {day.getDate()}. {strings.mon.long[
        day.getMonth()
      ]}
    </div>
    {#each display.hours as _, i}
      {#if i >= display.min && i <= display.max}
        <div
          class="col week-table-cell"
          data-date="{day.getFullYear()}-{day
            .getMonth()
            .toString()
            .padStart(2, '0')}-{day.getDate()}"
          data-hour="{i.toString().padStart(2, '0')}:00"
        >
          &nbsp;
        </div>
      {/if}
    {/each}
  </div>
</div>
