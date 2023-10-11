<script lang="ts">
  import WeekTableColumn from "./WeekTableColumn.svelte";
  import { strings } from "./strings";

  export let week: Number;
  export let from: Date;
  export let to: Date;

  let displayDays = [];
  let year = from.getFullYear();
  let month = from.getMonth();
  let day = from.getDate();
  for (let i = 0; i < 7; i++) {
    let date = new Date(year, month, day + i, 0, 0, 0, 0);
    displayDays.push(date);
  }
</script>

<div class="album bg-body-white week-table">
  <div class="row mx-0">
    <div class="col col-1">
      <div class="row row-cols-1">
        <div class="col week-table-header">
          KW {week}
        </div>
        {#each Array(24) as _, i}
        <div class="col week-table-header">
            {i.toString().padStart(2, "0")}:00
        </div>
        {/each}
      </div>
    </div>
    <div class=" col col-11">
        <div class="row row-cols-7">
    {#each displayDays as displayDay}
        <WeekTableColumn day={displayDay} />
    {/each}
        </div>
    </div>
  </div>
</div>
